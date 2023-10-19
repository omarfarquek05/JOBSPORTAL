import mongoose from "mongoose";

export function connectDB() {

    try {
        mongoose.connect(process.env.MONGODB_URL);
       
        const connection = mongoose.connection;
          connection.on("connected" , ()=> {
            console.log("MongoDB Connection Successfull");
          });

    } catch (error) {
        console.log(error);     
    }
}


