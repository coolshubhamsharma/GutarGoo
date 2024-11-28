import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import io,{ Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";


//creating the interface
interface ISocketConetxt {
    socket: Socket | null;
    onlineUsers: string[];
}


//creating the  socket Context
const SocketContext = createContext<ISocketConetxt | undefined>(undefined);

export const useSocketContext = (): ISocketConetxt =>{ // we will export this hook useSocketContext so that we can consume this context with the help of this hook
    const context =  useContext(SocketContext);
    if(context === undefined){
        throw new Error("useSocketContext must be used within an socketContextProvider");
    }
    return context;
};




const socketURL = import.meta.env.MODE === "development"? "http://localhost:8080" : "/"; // here in the production we are using '/' because we are going to deploy our front-end and back-end under the same url and this means that send a request to the current domain


// creating the context provider // its wraps the children components providing access to the socketContext to the children
const SocketContextProvider = ({children}: {children: ReactNode})=>{

    const socketRef = useRef<Socket | null>(null); //holds the socket without re-renders

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]); //state for online users to make changes update the SocketMap array or to keep track of the online users, as users connect with us we will push them into this state
    const {authUser, isLoading} = useAuthContext(); // getting these fron the authContext

    useEffect(()=>{
        if(authUser && !isLoading){
            const socket = io(socketURL, { //making connection with the server
                query: {
                    userId: authUser.id, // we are sending this user id under the query because we are getting the userID in the backend from here 
                },
            }); //connecting to our socket

            socketRef.current = socket;

            socket.on("getOnlineUsers", (users:string[])=>{
                setOnlineUsers(users);
            }); //listening for the events send by the server i.e active users

            return ()=>{
                socket.close();// closing the connection
                socketRef.current = null; //clears the reference to avoid holding onto a stale states
            };
        }else if(!authUser && !isLoading){ // if user is not authenticated
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    },[authUser , isLoading]);


    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )

}


export default SocketContextProvider;