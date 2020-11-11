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
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SeatsService = class SeatsService {
    constructor(seatModel) {
        this.seatModel = seatModel;
        this.seats = [];
    }
    async insertSeat(Seat_No, user_id) {
        const newSeat = new this.seatModel({
            Seat_No,
            user_id,
        });
        const result = await newSeat.save();
        console.log(result);
        return result.id;
    }
    async updateSeat(user_id, id) {
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
    async checkReset() {
        let seat;
        try {
            seat = this.seatModel.updateMany({ is_reset: true }, { is_reset: false });
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find details.');
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
    async getSingleTicket(Seat_No) {
        const seat = await this.seatModel.find({ Seat_No: Seat_No }).exec();
        return seat;
    }
    async findSeat(id) {
        let seat;
        try {
            seat = await this.seatModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find seat.');
        }
        if (!seat) {
            throw new common_1.NotFoundException('Could not find product (seats).');
        }
        else if (seat.length > 0) {
            throw new common_1.NotFoundException('Already Booked (seats) .');
        }
        else
            return seat;
    }
};
SeatsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Seat')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeatsService);
exports.SeatsService = SeatsService;
//# sourceMappingURL=seats.services.js.map