import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Seat } from './seat.model';
@Injectable()
export class SeatsService {
    private seats: Seat[] = [];
    constructor(@InjectModel('Seat') private readonly seatModel: Model<Seat>) { }


    async insertSeat(Seat_No: number, user_id: string,) {
        const newSeat = new this.seatModel({
            Seat_No,
            user_id,
        });
        const result = await newSeat.save();
        console.log(result);
        return result.id as string;
    }


    async updateSeat(user_id: string, id: string) {
        const updatedSeat = await this.findSeat(id);
        if (user_id) {
            updatedSeat.user_id = user_id;
            updatedSeat.is_reset = true;
        }

        updatedSeat.save();
    }

    async resetTicket() {
        const result = await this.checkReset();
        return result;
    }

    private async checkReset(): Promise<Seat> {
        let seat;
        try {
            seat = this.seatModel.updateMany({ is_reset: true }, { is_reset: false });
        } catch (error) {
            throw new NotFoundException('Could not find details.')
        }

        return seat;
    }

    async getBookedSeats() {
        const seats = await this.seatModel.find({ is_reset: true }).exec();
        console.log(seats);
        return seats.map((prod) => ({ id: prod.id, Seat_No: prod.Seat_No }));
    }

    async getUnBookedSeats() {
        const seats = await this.seatModel.find({ is_reset: false }).exec();
        console.log(seats);
        return seats.map((prod) => ({ id: prod.id, Seat_No: prod.Seat_No }));
    }

    async getSingleTicket(Seat_No: number) {
        const seat = await this.seatModel.find({Seat_No: Seat_No}).exec();
        return seat;
      }

    private async findSeat(id: string): Promise<Seat> {
        let seat;
        try {
            seat = await this.seatModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find seat.')
        }
        if (!seat) {
            throw new NotFoundException('Could not find product (seats).');
        }
        else if (seat.length > 0) {
            throw new NotFoundException('Already Booked (seats) .');
        }
        else
            return seat;
    }
}


