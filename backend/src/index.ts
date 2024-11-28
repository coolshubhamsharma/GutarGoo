import express from "express";
import cookieParser from "cookie-parser";
import path from "path";


import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/message.js"

import { app, server } from "./socket/socket.js";
import dotenv from "dotenv"
dotenv.config();


const port = process.env.PORT || 8080; 
const __dirname = path.resolve();

app.use(cookieParser()); //for parsing cookies
app.use(express.json()); //used for parsing the application/json data

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


//using only one server for both backend and frontend in production environment
if(process.env.NODE_ENV !== "development"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*" , (req, res)=>{
        res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"))
    })
}


server.listen(port , ()=>{ //using the http server
    console.log("server is running at "+port);
})


























//starter code for the project
// import express from "express";
// import authRoutes from "./routes/auth.js"
// import messageRoutes from "./routes/message.js"
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser"


// dotenv.config();

// const port = process.env.PORT || 8080; 
// const app = express();

// app.use(cookieParser()); //for parsing cookies
// app.use(express.json()); //used for parsing the application/json data

// app.use("/api/auth",authRoutes);
// app.use("/api/messages",messageRoutes);


// app.listen(port , ()=>{
//     console.log("server is running at "+port);
// })