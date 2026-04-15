import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI){
 throw new Error("MONGO_URI IS NOT DEFINED IN ENVIORNMENT VARIABLES");
}


if(!process.env.JWT_SECRET){
 throw new Error("JWT_SECRET IS NOT DEFINED IN ENVIORNMENT VARIABLES");
}




export const config={
   MONGO_URI: process.env.MONGO_URI,
   PORT:process.env.PORT,
   JWT_SECRET:process.env.JWT_SECRET
};