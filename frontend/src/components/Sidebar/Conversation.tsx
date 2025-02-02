import { useSocketContext } from "../../context/SocketContext";
import useConversation, { ConversationType } from "../../zustand/useConversation"




const Conversation = ({conversation , emoji}: {conversation: ConversationType,emoji:string}) => {

   const {setSelectedConversation , selectedConversation} = useConversation();
   const isSelected = selectedConversation?.id === conversation.id;

   const {onlineUsers} = useSocketContext();
   const isOnline = onlineUsers.includes(conversation.id); //manages the offline and online state

  return (

    <>
    <div className={`flex gap-2 items-center hover:bg-sky-600 rounded p-2 py-1 cursor-ponter hover:cursor-pointer ${isSelected ? 'bg-sky-500' : ""}`} onClick={()=> setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full '>
                <img src={conversation.profilePic} alt="user avatara" />
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                <span className='text-xl '>{emoji}</span>
            </div>
        </div>
    </div>

    <div className='divider my-0 py-0 h-1'/>   
    </>
  )
}

export default Conversation









// starter code for this file
// import React from 'react'

// const Conversation = () => {
//   return (
//     <>
//     <div className='flex gap-2 items-center hover:bg-sky-600 rounded p-2 py-1 cursor-ponter'>
//         <div className='avatar online'>
//             <div className='w-12 rounded-full '>
//                 <img src="https://cdn0.iconfinder.com/data/icons/comunication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt="user avatara" />
//             </div>
//         </div>

//         <div className='flex flex-col flex-1'>
//             <div className='flex gap-3 justify-between'>
//                 <p className='font-bold text-gray-200'>John Doe</p>
//                 <span className='text-xl '>😎</span>
//             </div>
//         </div>
//     </div>

//     <div className='divider my-0 py-0 h-1'/>   
//     </>
//   )
// }

// export default Conversation