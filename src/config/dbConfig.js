import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB Connection Successful");
        });
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}



// import mongoose from "mongoose";

// export function connectDB() {

//     try {
//         mongoose.connect(process.env.MONGODB_URL);
       
//         const connection = mongoose.connection;
//           connection.on("connected" , ()=> {
//             console.log("MongoDB Connection Successfull");
//           });

//     } catch (error) {
//         console.log(error);     
//     }
// }


