"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSchema = void 0;
const mongoose = require("mongoose");
exports.TicketSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    seat_id: { type: String },
    is_reset: { type: Boolean, default: false },
    Seat_No: { type: Number, required: true },
});
//# sourceMappingURL=ticket.model.js.map