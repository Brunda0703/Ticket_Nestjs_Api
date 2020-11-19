import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { SeatsService } from '../seats/seats.services';

@Controller('tickets')

export class TicketsController {
  constructor(private readonly ticketsService: TicketsService, private readonly seatsService: SeatsService) { }

  @Post()
  async addTicket(
    @Body('Name') TicketName: string,
    @Body('seat_id') Ticketseat_id: string,
    @Body('is_reset') Ticketis_reset: boolean,      
    @Body('Seat_No') TicketSeat_No: number,          
  ) {
    const generatedId = await this.ticketsService.insertTicket(
      TicketName,
      Ticketseat_id,
      Ticketis_reset,
      TicketSeat_No
    );

    await this.seatsService.updateSeat(generatedId, Ticketseat_id);
    return { User_id: generatedId };
  }

  @Get()
  async getAllTickets() {
    const tickets = await this.ticketsService.getTicket();
    const oldtickets = await this.ticketsService.getOldTicket();
    const booked = await this.seatsService.getBookedSeats();
    const unbooked = await this.seatsService.getUnBookedSeats();
    return {New_passengers: tickets, Old_passengers: oldtickets, booked: booked, unbooked: unbooked};
  }

  @Get('reset')
  async resetTicket() {
    const ticketResult = await this.ticketsService.resetTicket();
    const seatResult = await this.seatsService.resetTicket();
    return { result: [{ "ticketModified": ticketResult}, { "seatModeified": seatResult}] };
  }

  @Get(':Seat_No')
  getTicket(@Param('Seat_No') Seat_No: number) {
    return this.seatsService.getSingleTicket(Seat_No);
  }

  // @Patch(':id')
  // async updateTicket(
  //   @Param('id') TicketId: string,
  //   @Body('Name') TicketName: string,
  //   @Body('seat_id') Ticketseat_id: string,
  //   @Body('is_reset') Ticketis_reset: boolean,
  //   @Body('Seat_No') TicketSeat_No: number
  // ) {
  //   await this.ticketsService.updateTicket(TicketId, TicketName, Ticketseat_id, Ticketis_reset, TicketSeat_No);
  //   return null;
  // }

  // @Delete(':id')
  // async removeTicket(@Param('id') TicketId: string) {
  //   await this.ticketsService.deleteTicket(TicketId);
  //   return null;
  // }
}
