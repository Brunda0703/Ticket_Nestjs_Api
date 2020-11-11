import * as mongoose from 'mongoose';

export const SeatSchema=new mongoose.Schema({
  Seat_No:{type:String,required:true},
  user_id:{type: String,ref:'tickets'},
  is_reset:{ type: Boolean,default:false},
 });


export interface Seat extends mongoose.Document{
  
       id: string,
       Seat_No: number,
       user_id: string,
       is_reset:boolean,
       

  }
 
