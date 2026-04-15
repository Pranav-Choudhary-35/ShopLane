import mongoose from "mongoose";
import { config } from "./config.js";

const Mongoose=async ()=>{
try{
await mongoose.connect(config.MONGO_URI);
console.log("Database Connected Sucessfully");

}catch(err){
    console.log('Database connection error '+err);
}
}

export default Mongoose;