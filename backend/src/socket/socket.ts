import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); //this makes an instance of express

const server = http.createServer(app); //creating an http server using express
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET" , "POST"],
    },
}); //wrapping the http server inside he socket


// this is a utility/helper function which will help us in getting the socket id by passing the receiver's id in it
export const getReceiverSocketId = (receiverId: string)=>{
    return userSocketMap[receiverId];
}



//typecasting and telling thet key is typeof string and the value is also typeof string
const userSocketMap:{[key: string]: string} = {}; //{userId:socketId}


io.on("connection", (socket)=>{

    //typecast it as string as the typescript dosent know whether is a string or an array of strings
    const userId = socket.handshake.query.userId as string; //(SocketContext - line34) first we would get the user id from the socket so that we can store the online users & we will send the userId under the query in our react application

    if(userId){ // if there is a userId we would like to store it so that we can handle the online users
        userSocketMap[userId] = socket.id; //this is an object where we map the userId to the socket id

    }

    //io.emit() is used to send events to all conncted clients , we will send the keys(it will be an array) to the userSocketMap to update the status of the SocketMap  
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //next we send an event to all the online users that are recently connected, once a user logged in we will update that and we will send it to all users so that they can know this user just connected .

    // socket.on is used to listen to events , it can be used both on client and server
    socket.on("disconnect", ()=>{
        console.log("user disconnectd", socket.id);
        delete userSocketMap[userId]; 

        //now we have only updated the local object , we need to make the client be aware of that so,
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); //this will let all the users know that a user has been disconnectd and we will send the updated user object ie. update the SocketMap

    })
    
})


export {app, io, server};