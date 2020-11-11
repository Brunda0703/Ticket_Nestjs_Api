import {
    Controller,
    Post,
    Body,
    Get,

} from '@nestjs/common';

import { SeatsService } from './seats.services';

@Controller('seats')

export class SeatsController {
    constructor(private readonly seatsService: SeatsService) { }

    @Post()
    async addSeat(
        @Body('Seat_No') SeatSeat_No: number,
        @Body('user_id') Seatuser_id: string,
    ) {
        const generatedId = await this.seatsService.insertSeat(
            SeatSeat_No,
            Seatuser_id
        );
        return { id: generatedId };
    }

}