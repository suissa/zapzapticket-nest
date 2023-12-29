import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ContactDocument = HydratedDocument<Contact>;

class Badge {
  @Prop()
  type: string;
}

class Message {
  @Prop({ default: "sent" })
  type: string;

  @Prop({ default: "text" })
  typeMessage: string;

  @Prop()
  text: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  phone: string;
}

@Schema({ timestamps: true })
export class Contact {
  @Prop()
  _id: string;

  @Prop({ default: "Não informado"})
  name: string;

  @Prop({ set: (phone: string) => phone && phone.replace(/\D/g, "") })
  phone: string;

  @Prop()
  status: string = "Lista fria";

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ default: ""})
  profilePictureUrl: string;

  @Prop({ default: "inativo"})
  ticketStatus: string;

  @Prop()
  ticketCreatedAt: string;

  @Prop()
  ticketClosedAt: string;

  @Prop()
  conectionId: string;

  @Prop()
  groupId: string;

  @Prop({ type: [String] })
  badges: Types.Array<string>;

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
