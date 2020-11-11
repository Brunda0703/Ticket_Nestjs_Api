import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Ticket } from './ticket.model';
@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];
  constructor(@InjectModel('Ticket') private readonly ticketModel: Model<Ticket>) { }


  async insertTicket(Name: string, seat_id: string, is_reset: boolean, Seat_No: number) {
    const newTicket = new this.ticketModel({
      Name,
      seat_id,
      is_reset,
      Seat_No,
    });

    const check = await this.checkTicket(Seat_No);

    console.log(check);
    console.log("Check Ticket");
    if( check ){
      const result = await newTicket.save();
      console.log(result);
      return result.id as string;
    }
  }

  async getTicket() {
    const tickets = await this.ticketModel.find({is_reset: true}).exec();
    console.log(tickets);
    return tickets.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
  }

  async getOldTicket() {
    const tickets = await this.ticketModel.find({is_reset: false}).exec();
    console.log(tickets);
    return tickets.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
  }

  // async getSingleTicket(ticketId: string) {
  //   const ticket = await this.findTicket(ticketId);
  //   return { id: ticket.id, Name: ticket.Name, seat_id: ticket.seat_id, is_reset: ticket.is_reset, Seat_No: ticket.Seat_No };
  // }

  // async updateTicket(ticketId: string, Name: string, seat_id: string, is_reset: boolean, Seat_No: number) {
  //   const updatedTicket = await this.findTicket(ticketId);

  //   if (Name) {
  //     updatedTicket.Name = Name;
  //   }
  //   if (seat_id) {
  //     updatedTicket.seat_id = seat_id;
  //   }
  //   if (is_reset) {
  //     updatedTicket.is_reset = is_reset;
  //   }
  //   if (Seat_No) {
  //     updatedTicket.Seat_No = Seat_No;
  //   }
  //   updatedTicket.save();
  // }

  async resetTicket(){
    const result = await this.checkReset();
    return result;
  }

  // async deleteTicket(TicketId: string) {
  //   const result = await this.ticketModel.deleteOne({ _id: TicketId }).exec();
  //   if (result.n == 0) {
  //     throw new NotFoundException('Could not find details.')
  //   }

  // }

  private async checkReset(): Promise<Ticket> {
    let ticket;
    try {
      ticket = this.ticketModel.updateMany({is_reset: true },{is_reset:false});
    } catch (error) {
      throw new NotFoundException('Could not find details.')
    }

    return ticket;
  }

  private async checkTicket(Seat_No: number): Promise<Ticket> {
    let ticket;
    try {
      console.log(Seat_No);
      console.log("Seat_No");
      ticket = await this.ticketModel.find({ Seat_No: Seat_No, is_reset: true}).exec();
      let dum = ticket.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
      console.log(dum);

    } catch (error) {
      throw new NotFoundException('Could not find details.')
    }

    console.log(ticket);
    if (ticket.length > 0) {
      throw new NotFoundException('Already Booked (ticket) .');
    }
    else
      return ticket;
  }

  private async findTicket(id: string): Promise<Ticket> {
    let ticket;
    try {
      ticket = this.ticketModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find details.')
    }


    if (!ticket) {
      throw new NotFoundException('Could not find product.');
    }
    return ticket;
  }
}