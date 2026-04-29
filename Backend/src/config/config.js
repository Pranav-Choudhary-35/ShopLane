import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI){
 throw new Error("MONGO_URI IS NOT DEFINED IN ENVIORNMENT VARIABLES");
}


if(!process.env.JWT_SECRET){
 throw new Error("JWT_SECRET IS NOT DEFINED IN ENVIORNMENT VARIABLES");
}

if(!process.env.GOOGLE_CLIENT_ID){
   throw new Error("GOOGLE_CLIENT_ID IS NOT DEFINED IN EVVIRONMENTAL VARIABLES")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
   throw new Error("GOOGLE_CLIENT_SECRET IS NOT DEFINED IN EVVIRONMENTAL VARIABLES")
}

if(!process.env.IMAGE_KIT_PRIVATE_KEY){
   throw new Error("IMAGE_KIT_PRIVATE_KEY IS NOT DEFINED IN EVVIRONMENTAL VARIABLES")
}


export const config={
   MONGO_URI: process.env.MONGO_URI,
   PORT:process.env.PORT,
   JWT_SECRET:process.env.JWT_SECRET,
   GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY
};