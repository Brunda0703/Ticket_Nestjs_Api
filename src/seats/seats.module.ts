import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.services';
import {SeatSchema}from './seat.model';

@Module({
    imports:[MongooseModule.forFeature([{
        name:'Seat',schema:SeatSchema
    }])],
    controllers: [SeatsController],
    providers: [SeatsService],
    exports: [SeatsService]
})
export class SeatsModule {}