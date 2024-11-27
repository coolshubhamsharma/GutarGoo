import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useGetMessages = () => {
  const [loading , setLoading] = useState(false);
  const {messages , setMessages , selectedConversation} = useConversation(); //getting these from zustand(global state manager)
  
  useEffect(()=>{

    const getMessages = async ()=>{
        if(!selectedConversation) return;
        setLoading(true);
        setMessages([]);
        try{
            
            const res = await fetch(`/api/messages/${selectedConversation.id}`);
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "An Error Occured");
            }
            setMessages(data);
        }
        catch(error:any){
            console.log(error.message);
            toast.error(error.message);
        }
    }

    getMessages();
  },[selectedConversation , setMessages]);

  return {loading , messages};

}

export default useGetMessages