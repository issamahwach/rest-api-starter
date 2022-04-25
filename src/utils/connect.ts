import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger";

async function connect(){
    const dbUri = config.get<string>("dbUri");

    try{
        await mongoose.connect(dbUri)
        log.info("Database connected!");
    }catch(error){
        log.error("Error connecting to database:", error);
        process.exit(1);
    }
    
}

export default connect;