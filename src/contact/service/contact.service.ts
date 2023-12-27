import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from '../schema/contact.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto, CreateContactDtoPartial } from '../dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<Contact>) {}

  async create(request: CreateContactDtoPartial): Promise<Contact> {
    return await this.contactModel.create(request);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find().sort({ name: 1 });
  }

  async findOne(id: string): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.contactModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateContactDto) {
    return await this.contactModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateContactDto) {
    return await this.contactModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.contactModel.findByIdAndDelete(id);
  }


  async saveSentTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const contact = await this.contactModel.findOne({ phone: request.phone });

    if (!contact) {
      // throw new NotFoundException(`Contact with phone ${request.phone} not found`);
      const _contact = {
        name: request.name,
        phone: request.phone,
        messages: [],
      }
      const result = await this.create(_contact);
      console.log("Contact Service saved new contact: ", result)
      return result;
    }
    const message = {
      type: "sent",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    contact.messages.push(message);
    return await contact.save();
  }

  async saveReceivedTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const contact = await this.contactModel.findOne({ phone: request.phone });

    console.log("contact: ", contact);
    if (!contact) {
      throw new NotFoundException(`Contact with phone ${request.phone} not found`);
    }
    const message = {
      type: "received",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    contact.messages.push(message);
    console.log("contact depois: ", contact);
    return await contact.save();
  }

  async getAllMessages(): Promise<any> {
    const contacts = await this.contactModel.find({}).lean();

    const contactsLastMessage = contacts.map(contact => {
      const lastMessage = contact.messages.pop();

      return {
        ...contact,
        messages: lastMessage ? [lastMessage] : [],
      };
    }).filter(contact => contact.messages.length > 0)
    .sort((a, b) => {
      return new Date(b.messages[0].createdAt).getTime() - new Date(a.messages[0].createdAt).getTime();
    });

    return contactsLastMessage;
  }

  async updateTicketStatus(id: string, request: UpdateContactDto): Promise<any> {
    return await this.contactModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

}
