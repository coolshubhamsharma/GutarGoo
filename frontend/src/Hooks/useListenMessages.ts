import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";

import notification from "../assets/Sounds/notification.mp3";


// this hook is listening for the messages from the server

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{ //we also have to create this neMEssage event in the backend when we create a new message
        newMessage.shouldShake = true; //adding the shake functionality to realtime messages
        const sound = new Audio(notification);
        sound.play(); //with every new message plays the notification sound
        setMessages([...messages, newMessage]);
    });

    return ()=> {
        socket?.off("newMessages"); //This line is typically inside a useEffect hook. The function returned by useEffect acts as a cleanup function that runs when: The component unmounts.,Dependencies of the useEffect change.
    }

  },[socket, messages, setMessages]);

  

}

export default useListenMessages