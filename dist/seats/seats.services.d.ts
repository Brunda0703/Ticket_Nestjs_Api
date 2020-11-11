import { Model } from 'mongoose';
import { Seat } from './seat.model';
export declare class SeatsService {
    private readonly seatModel;
    private seats;
    constructor(seatModel: Model<Seat>);
    insertSeat(Seat_No: number, user_id: string): Promise<string>;
    updateSeat(user_id: string, id: string): Promise<void>;
    resetTicket(): Promise<Seat>;
    private checkReset;
    getBookedSeats(): Promise<{
        id: string;
        Seat_No: number;
    }[]>;
    getUnBookedSeats(): Promise<{
        id: string;
        Seat_No: number;
    }[]>;
    getSingleTicket(Seat_No: number): Promise<Seat[]>;
    private findSeat;
}
