import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("moongo Db connected successfully")
    }catch(error){
        console.log("error connecting to mongo Db",error)
    }
}