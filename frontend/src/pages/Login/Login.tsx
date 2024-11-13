import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-blue-600 m-1'>GutarGoo</span>
            </h1>
            
            <form action="">
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-black font-semibold'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter Username' className='w-full input input-border h-10 bg-black text-cyan-50'/>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text text-black font-semibold'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='w-full  input input-border h-10 bg-black text-cyan-50' />
                </div>
                <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black' to='/signup'>
                    Don't have an account?
                </Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2 bg-red-600 text-white border border-none'>Login</button>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Login







//starter code for the login component
// import React from 'react'
// import { Link } from 'react-router-dom'

// const Login = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//         <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//             <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                 Login
//                 <span className='text-blue-600 m-1'>GutarGoo</span>
//             </h1>
            
//             <form action="">
//                 <div>
//                     <label className='label p-2'>
//                         <span className='text-base label-text text-black font-semibold'>Username</span>
//                     </label>
//                     <input type="text" placeholder='Enter Username' className='w-full input input-border h-10 bg-black text-cyan-50'/>
//                 </div>

//                 <div>
//                     <label className='label'>
//                         <span className='text-base label-text text-black font-semibold'>Password</span>
//                     </label>
//                     <input type="password" placeholder='Enter Password' className='w-full  input input-border h-10 bg-black text-cyan-50' />
//                 </div>
//                 <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black' to='/signup'>
//                     Don't have an account?
//                 </Link>

//                 <div>
//                     <button className='btn btn-block btn-sm mt-2 bg-red-600 text-white border border-none'>Login</button>
//                 </div>
//             </form>
//         </div> 
//     </div>
//   )
// }

// export default Login