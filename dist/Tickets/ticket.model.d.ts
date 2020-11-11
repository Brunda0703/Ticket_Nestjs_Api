import * as mongoose from 'mongoose';
export declare const TicketSchema: mongoose.Schema<any>;
export interface Ticket extends mongoose.Document {
    id: string;
    Name: string;
    seat_id: string;
    is_reset: boolean;
    Seat_No: number;
}
