
import SearchInput from './SearchInput'
import Conversations from './conversations'
import LogoutButton from './LogoutButton'


const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>  
        <SearchInput/>
        <div className='divider px-3'/>
        <Conversations/>
        <LogoutButton/>
        
    </div>
  )
}

export default Sidebar












//starter code for this file
// import React from 'react'
// import SearchInput from './SearchInput'
// import Conversations from './conversations'
// import LogoutButton from './LogoutButton'


// const Sidebar = () => {
//   return (
//     <div className='border-r border-slate-500 p-4 flex flex-col'>  
//         <SearchInput/>
//         <div className='divider px-3'></div>
//         <Conversations/>
//         <LogoutButton/>
        
//     </div>
//   )
// }

// export default Sidebar