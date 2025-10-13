import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database Connection successfull")
    } catch (error) {
        throw new Error("Internal Server Error "+ error.message)
    }
}

export default connectDB