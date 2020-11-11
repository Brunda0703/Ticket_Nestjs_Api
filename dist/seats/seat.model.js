"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatSchema = void 0;
const mongoose = require("mongoose");
exports.SeatSchema = new mongoose.Schema({
    Seat_No: { type: String, required: true },
    user_id: { type: String, ref: 'tickets' },
    is_reset: { type: Boolean, default: false },
});
//# sourceMappingURL=seat.model.js.map