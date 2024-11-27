import { MessageCircle } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";

// import { MessageCircle } from "lucide-react";

const MessageContainer = () => {

	const {selectedConversation} = useConversation(); //getting this from zustand
	
	return (
		<div className='md:min-w-[450px] flex flex-col h-[470px]'>
			{!selectedConversation ? (
				<NoChatSelected/>
			): (
				<>
				{/* Header */}
				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
			)}
		</div>
	);
};
export default MessageContainer;










// old code
// import Messages from './Messages'
// import MessageInput from './MessageInput'
// import { TiMessages } from 'react-icons/ti'

// const MessageContainer = () => {

//     const noChatSelected = true;

//   return (
//     <div className='md:min-w-[450px] flex flex-col h-[470px]'>
//        {noChatSelected ? (<NoChatSelected/>) :(
//          <>
//          {/* <Header/> */}
//          <div className='bg-slate-500 px-4 py-2 mb-2'>
//            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John Doe</span>
//          </div>

//          <Messages/>

//          <MessageInput/>
//        </>
//        ) }
//     </div>
//   )
// }

// export default MessageContainer


const NoChatSelected = ()=>{

    const {authUser} = useAuthContext();

    return(
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👻 {authUser?.fullName} 👦</p>
                <p>Select a chat to Start Messaging </p>
                <MessageCircle className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    );
}