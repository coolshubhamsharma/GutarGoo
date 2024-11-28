import { RequestHandler, Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response)=>{
    try{
        const { message } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user.id; //getting this from the protectRoute

        // find the conversation
        let conversation = await prisma.conversation.findFirst({
            where:{
                participantsIds:{
                    hasEvery: [senderId , receiverId]
                }
            }
        })

        // if this is true that means its the begining of the the conversation and the very first message is being sent
        if(!conversation){
            conversation = await prisma.conversation.create({ //creating a new conversation
                data: {
                    participantsIds: {
                        set: [senderId , receiverId]
                    }
                }
            })
        }

        // creating the new message
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,

            }
        });

        // we added that message into the conversation so that later we can query those messages in a conversation
        if(newMessage){
            conversation = await prisma.conversation.update({
                where: {id: conversation.id},
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        }
                    }
                }
            })
        }
 
        //socket io will go here so that we can have realtime conversation
        const receiverSocketId = getReceiverSocketId(receiverId); //here receiver id is basically userId and this function will give us socketId of the user

        // When User A sends a message to User B: The server checks if User B is online (i.e., their receiverSocketId exists).If User B is online, the server delivers the message in real-time via the socket.
        if(receiverSocketId){ 
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage); //201 means something is created
    }
    catch(error:any){
        console.log("error sending message" , error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const getMessages = async (req: Request , res: Response)=>{
    try{
        const { id:userToChatId } = req.params;
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where : {
                participantsIds: {
                    hasEvery:[senderId , userToChatId], //means has every field present in the array
                }
            },
            include : {
                messages :{
                    orderBy: {
                        createdAt : "asc",
                    }
                }
            }
        });

        if(!conversation){
            res.status(200).json([]);
            return;
        }

        res.status(200).json(conversation.messages);
    }
    catch(error:any){
        console.log("error getitng message" , error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getUsersForSidebar = async (req :Request , res : Response)=>{
    try{
        const authUserId = req.user.id; // getting the sender id from the ptotectRoute middleware

        const users = await prisma.user.findMany({ //this will get all the users except the sender itself
            where : {
                id : {
                    not : authUserId,
                }
            },
            select: { // getting some of the data of the users to show on the sidevar
                id: true,
                fullName: true,
                profilePic: true
            }
        });

        res.status(200).json(users);
    }
    catch(error:any){
        console.log("Cannot get the Users For Sidebar",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}























//code without socket.io functionality
// export const sendMessage = async (req: Request, res: Response)=>{
//     try{
//         const { message } = req.body;
//         const { id:receiverId } = req.params;
//         const senderId = req.user.id; //getting this from the protectRoute

//         // find the conversation
//         let conversation = await prisma.conversation.findFirst({
//             where:{
//                 participantsIds:{
//                     hasEvery: [senderId , receiverId]
//                 }
//             }
//         })

//         // if this is true that means its the begining of the the conversation and the very first message is being sent
//         if(!conversation){
//             conversation = await prisma.conversation.create({ //creating a new conversation
//                 data: {
//                     participantsIds: {
//                         set: [senderId , receiverId]
//                     }
//                 }
//             })
//         }

//         // creating the new message
//         const newMessage = await prisma.message.create({
//             data: {
//                 senderId,
//                 body: message,
//                 conversationId: conversation.id,

//             }
//         });

//         // we added that message into the conversation so that later we can query those messages in a conversation
//         if(newMessage){
//             conversation = await prisma.conversation.update({
//                 where: {id: conversation.id},
//                 data: {
//                     messages: {
//                         connect: {
//                             id: newMessage.id,
//                         }
//                     }
//                 }
//             })
//         }
 
//         //socket io will go here so that we can have realtime conversation

//         res.status(201).json(newMessage); //201 means something is created
//     }
//     catch(error:any){
//         console.log("error sending message" , error.message);
//         res.status(500).json({error:"Internal Server Error"});
//     }
// }