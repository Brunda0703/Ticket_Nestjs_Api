import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import {TicketSchema}from './ticket.model';
import { SeatsModule } from '../seats/seats.module';

@Module({
    imports:[SeatsModule,MongooseModule.forFeature([{
        name:'Ticket',schema:TicketSchema
    }])],
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class TicketsModule {}