import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import  dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"

import cors from "cors"

dotenv.config()
//console.log(process.env.MONGO_URI)
    

const app = express()
const PORT =process.env.PORT || 5001;

//connectDB();

//middleware
app.use(cors(
    {
        origin:"http://localhost:5173"
    }
))
app.use(express.json());
app.use(rateLimiter);


//our simple custom middleware
//app.use((req,res,next)=>{
//    console.log("we just got a new  req")
//    next();
//})

app.use("/api/notes",notesRoutes)


//http://localhost:5001/api/notes/21

//app.listen(PORT, ()=>{
//    console.log("server statred at port:",PORT )
//})

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server statred at port:",PORT )
    });
})

//mongodb+srv://michaelarevalo221_db_user:yqpA45HhT6Wl8i6y@cluster0.jmduvd4.mongodb.net/note?appName=Cluster0