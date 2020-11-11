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
exports.SeatsController = void 0;
const common_1 = require("@nestjs/common");
const seats_services_1 = require("./seats.services");
let SeatsController = class SeatsController {
    constructor(seatsService) {
        this.seatsService = seatsService;
    }
    async addSeat(SeatSeat_No, Seatuser_id) {
        const generatedId = await this.seatsService.insertSeat(SeatSeat_No, Seatuser_id);
        return { id: generatedId };
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('Seat_No')),
    __param(1, common_1.Body('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], SeatsController.prototype, "addSeat", null);
SeatsController = __decorate([
    common_1.Controller('seats'),
    __metadata("design:paramtypes", [seats_services_1.SeatsService])
], SeatsController);
exports.SeatsController = SeatsController;
//# sourceMappingURL=seats.controller.js.map