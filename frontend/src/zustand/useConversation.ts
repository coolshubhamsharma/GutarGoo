import { create } from "zustand";
//zustand is a small and fast state management library
// the create function is used to define a store with state and methods for managing it


//defining type of the state
export type ConversationType = {
    id:string;
    fullName:string;
    profilePic:string;
}

export type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt:string;
}


// interface for zustand state
interface conversationState{
    selectedConversation: ConversationType | null;
    messages:MessageType[];
    setSelectedConversation: (conversation: ConversationType | null )=> void;
    setMessages: (messages:MessageType[])=>void;
}


//creating the zustand store
const useConversation = create<conversationState>((set)=>({
    selectedConversation: null, //selected conversation's innitial value will be null
    setSelectedConversation: (Conversation) => set({selectedConversation: Conversation}),
    messages:[],
    setMessages:(messages) => set({messages:messages}),
}));

export default useConversation;









































// javascript version
// import { create } from "zustand";

// const useConversation = create((set)=>({
//     selectedConversation: null, //selected conversation's innitial value will be null
//     setSelectedConversation: (Conversation) => set({selectedConversation: Conversation}),
//     messages:[],
//     setMessages:(messages) => set({messages:messages}),
// }));

// export default useConversation;