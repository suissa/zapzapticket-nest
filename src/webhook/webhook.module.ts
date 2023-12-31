import { Module } from "@nestjs/common";
import { WebhookService } from "./service/webhook.service";
import { ContactModule } from "../contact/contact.module";
import { ConnectionModule } from "../connection/connection.module";
import { WebhookController } from "./controller/webhook.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Webhook, WebhookSchema } from "./schema/webhook.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema }]),
    ContactModule, ConnectionModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}