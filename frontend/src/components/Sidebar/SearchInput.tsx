import { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5';
import useConversation, { ConversationType } from '../../zustand/useConversation';
import useGetConversations from '../../Hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {

  const[search , setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const formSubmitHandler = async (e:React.FormEvent) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error("search term must be atleast 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType)=> //this line of code convers both the conversation's name and the search input into lowecase and them compare the two and returns the matching conversationa 
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    // Note:- if we remove curly brackets({}) fron an arrow functions it bydefaults returns something, else we have to add the return statement

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else{
     toast.error("No such user found!");
    }
  };


  return (
    <form className='flex items-center gap-2 p-2' onSubmit={formSubmitHandler}>
        <input type="text" placeholder='search...' className='input input-bordered rounded-full bg-black text-cyan-50'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-blue-600  text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput




// starter code for this file
// import React from 'react'
// import { IoSearchSharp } from 'react-icons/io5';

// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2 p-2'>
//         <input type="text" placeholder='search...' className='input input-bordered rounded-full bg-black text-cyan-50' />
//         <button type='submit' className='btn btn-circle bg-blue-600  text-white'>
//         <IoSearchSharp className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput