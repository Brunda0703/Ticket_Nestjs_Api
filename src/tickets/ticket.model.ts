import * as mongoose from 'mongoose';

export const TicketSchema=new mongoose.Schema({
  Name:{type:String,required:true},
  seat_id:{type:String},
  is_reset:{type:Boolean,default:false},
  Seat_No:{type:Number,required:true},
});


export interface Ticket extends mongoose.Document{
  
       id: string,
       Name: string,
       seat_id: string,
       is_reset: boolean,
       Seat_No: number,

  }
 
