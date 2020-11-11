import { Model } from 'mongoose';
import { Ticket } from './ticket.model';
export declare class TicketsService {
    private readonly ticketModel;
    private tickets;
    constructor(ticketModel: Model<Ticket>);
    insertTicket(Name: string, seat_id: string, is_reset: boolean, Seat_No: number): Promise<string>;
    getTicket(): Promise<{
        id: string;
        Name: string;
        seat_id: string;
        is_reset: boolean;
        Seat_No: number;
    }[]>;
    getOldTicket(): Promise<{
        id: string;
        Name: string;
        seat_id: string;
        is_reset: boolean;
        Seat_No: number;
    }[]>;
    resetTicket(): Promise<Ticket>;
    private checkReset;
    private checkTicket;
    private findTicket;
}
