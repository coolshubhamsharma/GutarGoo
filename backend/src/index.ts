import express from "express";
import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/message.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


dotenv.config();

const app = express();

app.use(cookieParser()); //for parsing cookies
app.use(express.json()); //used for parsing the application/json data

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.listen(8080 , ()=>{
    console.log('server is running at 8080')
})