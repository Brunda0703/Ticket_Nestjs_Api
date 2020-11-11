import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import {SeatsModule} from './seats/seats.module';

@Module({
  imports: [SeatsModule,TicketsModule,MongooseModule.forRoot('mongodb+srv://brunda:b070310b@cluster0-eocz5.mongodb.net/Ticket?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}