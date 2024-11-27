import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "../Skeleteons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {

    const {loading , messages} = useGetMessages();
	// console.log(messages.map((message)=>message.id));

	return (
		<div className='px-4 flex-1 overflow-auto'>
            {loading && messages.map((message) => (
				<Message key={message.id} message={message} />
			))}

			{!loading && [...Array(3)].map((_, idx)=> <MessageSkeleton key={idx}/>)} {/*if its loading it will show the skeletons else show the messages */}

			{!loading && messages.length === 0 &&(
				<p className="text-center text-white ">Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;




// starter code for this file
// import Message from './Message'

// const Messages = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto h-full'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
        
//     </div>
//   )
// }

// export default Messages


















//starter code(2nd) for this file
// import { DUMMY_MESSAGES } from "../../dummy_data/dummy";
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{DUMMY_MESSAGES.map((message) => (
// 				<Message key={message.id} message={message} />
// 			))}
// 		</div>
// 	);
// };
// export default Messages;