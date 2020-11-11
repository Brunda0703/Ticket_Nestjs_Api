import { TicketsService } from './tickets.service';
import { SeatsService } from '../seats/seats.services';
export declare class TicketsController {
    private readonly ticketsService;
    private readonly seatsService;
    constructor(ticketsService: TicketsService, seatsService: SeatsService);
    addTicket(TicketName: string, Ticketseat_id: string, Ticketis_reset: boolean, TicketSeat_No: number): Promise<{
        User_id: string;
    }>;
    getAllTickets(): Promise<{
        passangers: {
            id: string;
            Name: string;
            seat_id: string;
            is_reset: boolean;
            Seat_No: number;
        }[];
        old_passangers: {
            id: string;
            Name: string;
            seat_id: string;
            is_reset: boolean;
            Seat_No: number;
        }[];
        booked: {
            id: string;
            Seat_No: number;
        }[];
        unbooked: {
            id: string;
            Seat_No: number;
        }[];
    }>;
    resetTicket(): Promise<{
        result: ({
            ticketModified: import("./ticket.model").Ticket;
            seatModeified?: undefined;
        } | {
            seatModeified: import("../seats/seat.model").Seat;
            ticketModified?: undefined;
        })[];
    }>;
    getTicket(Seat_No: number): Promise<import("../seats/seat.model").Seat[]>;
}
