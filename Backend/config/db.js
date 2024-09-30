import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
import dotenv from "dotenv"
dotenv.config();
export const connectDb=async () =>{
    try{
        const conn=await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("mongodb connected" + conn.connection.host);
        
    }
    catch(error){
        console.log("error connecting to mongodb"  + error.message);
        
        process.exit(1);  //  1 means there was an error , 0 menas succes 

    }
}