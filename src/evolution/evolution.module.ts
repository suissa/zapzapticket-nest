<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { ConnectionService } from '../connection/service/connection.service';
import { EvolutionService } from './service/evolution.service';
import { ContactService } from '../contact/service/contact.service';
import { MessageService } from '../message/service/message.service';
import { EvolutionController } from './controller/evolution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evolution, EvolutionSchema } from './schema/evolution.schema';
=======
import { Module } from "@nestjs/common";
import { RabbitmqService } from "./service/rabbitmq.service";
import { EvolutionService } from "./service/evolution.service";
import { EvolutionController } from "./controller/evolution.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Evolution, EvolutionSchema } from "./schema/evolution.schema";
import { MessageGateway }  from "../gateways/message.gateway";
import { ClientsModule, Transport } from "@nestjs/microservices";

>>>>>>> develop

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evolution.name, schema: EvolutionSchema }]),
    MessageGateway
  ],
  controllers: [EvolutionController],
  providers: [EvolutionService, RabbitmqService, MessageGateway],
  exports: [EvolutionService, RabbitmqService],
})
export class EvolutionModule {}
