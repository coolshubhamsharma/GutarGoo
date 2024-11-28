import express from "express";
import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/message.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket.js";


dotenv.config();

const port = process.env.PORT || 8080; 

app.use(cookieParser()); //for parsing cookies
app.use(express.json()); //used for parsing the application/json data

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


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