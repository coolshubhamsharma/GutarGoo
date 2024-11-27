import { useEffect, useState } from "react"
import { ConversationType } from "../zustand/useConversation";
import toast from "react-hot-toast";


const useGetConversations = () => {

  const [loading , setLoading] = useState(false);
  const [conversations , setConversations] = useState<ConversationType[]>([]);

  useEffect(()=>{

    const getConversations = async ()=>{ //this function fetches all the users apart from the current user and we will call this function in the sidebar to show all the conversations
     setLoading(true);
     try{
       const res = await fetch("/api/messages/conversations"); //fetching conversations
       const data = await res.json();
       if(data.error){
        throw new Error(data.error);
       }
       setConversations(data);
      }
      catch(error:any){
       console.log("error fetching conversations")
       toast.error(error.message);
      }
      finally{
       setLoading(false);
      }
    };

   getConversations();

  },[])

  return {loading , conversations};

}

export default useGetConversations