import * as mongoose from 'mongoose';
export declare const SeatSchema: mongoose.Schema<any>;
export interface Seat extends mongoose.Document {
    id: string;
    Seat_No: number;
    user_id: string;
    is_reset: boolean;
}
