import { SeatsService } from './seats.services';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    addSeat(SeatSeat_No: number, Seatuser_id: string): Promise<{
        id: string;
    }>;
}
