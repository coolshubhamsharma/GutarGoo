import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useSendMessages = () => {
  const [loading , setLoading] = useState(false); //creating a state
  const {messages, setMessages, selectedConversation} = useConversation(); //getting from zustand(global state manager)

  const sendMessages = async (message:string)=>{ // get the messages from the input form and the messages will be passes in this functionz
    if(!selectedConversation) return;
    setLoading(true);

    try{
        const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
            method: "POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify({message}),
        });
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        setMessages([...messages,data]);

    }
    catch(error:any){
        console.log(error.message);
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  }

  return{sendMessages , loading};
}

export default useSendMessages