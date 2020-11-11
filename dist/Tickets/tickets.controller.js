"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const seats_services_1 = require("../seats/seats.services");
let TicketsController = class TicketsController {
    constructor(ticketsService, seatsService) {
        this.ticketsService = ticketsService;
        this.seatsService = seatsService;
    }
    async addTicket(TicketName, Ticketseat_id, Ticketis_reset, TicketSeat_No) {
        const generatedId = await this.ticketsService.insertTicket(TicketName, Ticketseat_id, Ticketis_reset, TicketSeat_No);
        await this.seatsService.updateSeat(generatedId, Ticketseat_id);
        return { User_id: generatedId };
    }
    async getAllTickets() {
        const tickets = await this.ticketsService.getTicket();
        const oldtickets = await this.ticketsService.getOldTicket();
        const booked = await this.seatsService.getBookedSeats();
        const unbooked = await this.seatsService.getUnBookedSeats();
        return { passangers: tickets, old_passangers: oldtickets, booked: booked, unbooked: unbooked };
    }
    async resetTicket() {
        const ticketResult = await this.ticketsService.resetTicket();
        const seatResult = await this.seatsService.resetTicket();
        return { result: [{ "ticketModified": ticketResult }, { "seatModeified": seatResult }] };
    }
    getTicket(Seat_No) {
        return this.seatsService.getSingleTicket(Seat_No);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('Name')),
    __param(1, common_1.Body('seat_id')),
    __param(2, common_1.Body('is_reset')),
    __param(3, common_1.Body('Seat_No')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Number]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "addTicket", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getAllTickets", null);
__decorate([
    common_1.Get('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "resetTicket", null);
__decorate([
    common_1.Get(':Seat_No'),
    __param(0, common_1.Param('Seat_No')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicket", null);
TicketsController = __decorate([
    common_1.Controller('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService, seats_services_1.SeatsService])
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map