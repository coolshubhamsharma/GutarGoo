
import useGetConversations from "../../Hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojies";
import Conversation from "./Conversation";

const Conversations = () => {

	const {conversations , loading} = useGetConversations(); //getting it from the hooks
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
			))}
			{loading ? (
				<span className="loading loading-spinner mx - auto" />
			) : null}
		</div>
	);
};
export default Conversations;











// starter code for this file
// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//     </div>
//   )
// }

// export default Conversations


// starter code(2) for the file
// import { DUMMY_CONVERSATIONS } from "../../dummy_data/dummy";
// import Conversation from "./Conversation";

// const Conversations = () => {
	
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			{DUMMY_CONVERSATIONS.map((conversation) => (
// 				<Conversation key={conversation.id} conversation={conversation} />
// 			))}
// 		</div>
// 	);
// };
// export default Conversations;