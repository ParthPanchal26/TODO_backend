import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        dbName: "TODO_Backend",
    })
        .then((host) => {
            console.log(`Database connected!: : ${host.connection.host}`);
        })
        .catch((err) => {
            console.log("DB connection Error: : " + err);
        })
}