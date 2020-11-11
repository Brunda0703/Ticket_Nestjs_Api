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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TicketsService = class TicketsService {
    constructor(ticketModel) {
        this.ticketModel = ticketModel;
        this.tickets = [];
    }
    async insertTicket(Name, seat_id, is_reset, Seat_No) {
        const newTicket = new this.ticketModel({
            Name,
            seat_id,
            is_reset,
            Seat_No,
        });
        const check = await this.checkTicket(Seat_No);
        console.log(check);
        console.log("Check Ticket");
        if (check) {
            const result = await newTicket.save();
            console.log(result);
            return result.id;
        }
    }
    async getTicket() {
        const tickets = await this.ticketModel.find({ is_reset: true }).exec();
        console.log(tickets);
        return tickets.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
    }
    async getOldTicket() {
        const tickets = await this.ticketModel.find({ is_reset: false }).exec();
        console.log(tickets);
        return tickets.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
    }
    async resetTicket() {
        const result = await this.checkReset();
        return result;
    }
    async checkReset() {
        let ticket;
        try {
            ticket = this.ticketModel.updateMany({ is_reset: true }, { is_reset: false });
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find details.');
        }
        return ticket;
    }
    async checkTicket(Seat_No) {
        let ticket;
        try {
            console.log(Seat_No);
            console.log("Seat_No");
            ticket = await this.ticketModel.find({ Seat_No: Seat_No, is_reset: true }).exec();
            let dum = ticket.map((prod) => ({ id: prod.id, Name: prod.Name, seat_id: prod.seat_id, is_reset: prod.is_reset, Seat_No: prod.Seat_No }));
            console.log(dum);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find details.');
        }
        console.log(ticket);
        if (ticket.length > 0) {
            throw new common_1.NotFoundException('Already Booked (ticket) .');
        }
        else
            return ticket;
    }
    async findTicket(id) {
        let ticket;
        try {
            ticket = this.ticketModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find details.');
        }
        if (!ticket) {
            throw new common_1.NotFoundException('Could not find product.');
        }
        return ticket;
    }
};
TicketsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Ticket')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map