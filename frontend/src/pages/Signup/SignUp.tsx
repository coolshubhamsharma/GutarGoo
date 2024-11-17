
import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox'
import { useState } from 'react'
import usesignup from '../../Hooks/usesignup';
import { UseSignupReturnType } from '../../Hooks/usesignup'


const SignUp = () => {

  const [inputs , setInputs] = useState({
    fullName: "",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"",
  });


  const {loading, signup} = usesignup() as UseSignupReturnType; //the type of the function is defined here 

  const handleCheckBoxChange = (gender:"male" | "female" | "other")=>{
      setInputs({ ...inputs, gender});
  }

  const formSubmitHandler = (e : React.FormEvent)=>{
      e.preventDefault(); //so that the form does not refresh
      console.log(inputs);
      signup(inputs); // calling the signup function in the usesignup hook
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-600 m-1'>GutarGoo</span>
        </h1>

        <form action="" onSubmit={formSubmitHandler}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-semibold'>Full Name </span>
            </label>
            <input type="text" placeholder='Enter Your Name' className='w-full input input-bordered h-10 bg-black text-cyan-50' value={inputs.fullName} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-semibold'>Username </span>
            </label>
            <input type="text" placeholder='Username' className='w-full input input-bordered h-10 bg-black text-cyan-50' value={inputs.username} onChange={(e)=>setInputs({...inputs, username: e.target.value})}/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-semibold'>Password </span>
            </label>
            <input type="password" placeholder='Enter Your Password' className='w-full input input-bordered h-10 bg-black text-cyan-50' value={inputs.password} onChange={(e)=>setInputs({...inputs, password: e.target.value})}/>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black font-semibold'>Confirm Password </span>
            </label>
            <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10 bg-black text-cyan-50' value={inputs.confirmPassword} onChange={(e)=>setInputs({...inputs, confirmPassword: e.target.value})}/>
          </div>

          <GenderCheckbox 
          selectedGender={inputs.gender} onCheckboxChange={handleCheckBoxChange}/>

          <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black' to='/login'> 
            Already have an account?
          </Link>
          
          <div>
                    <button className='btn btn-block btn-sm mt-2 bg-red-600 text-white border border-none' disabled={loading}>{loading ? "Loading...": "Sign Up"}</button>  {/*This prop disables the button when loading is true, preventing users from clicking multiple times while an action is in progress  */}
                </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp











//starter code for the signup component
// import React from 'react'
// import { Link } from 'react-router-dom'
// import GenderCheckbox from './GenderCheckbox'

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Sign Up <span className='text-blue-600 m-1'>GutarGoo</span>
//         </h1>

//         <form action="">
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black font-semibold'>Full Name </span>
//             </label>
//             <input type="text" placeholder='Enter Your Name' className='w-full input input-bordered h-10 bg-black text-cyan-50'/>
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black font-semibold'>Username </span>
//             </label>
//             <input type="text" placeholder='Username' className='w-full input input-bordered h-10 bg-black text-cyan-50'/>
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black font-semibold'>Password </span>
//             </label>
//             <input type="password" placeholder='Enter Your Password' className='w-full input input-bordered h-10 bg-black text-cyan-50'/>
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black font-semibold'>Confirm Password </span>
//             </label>
//             <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10 bg-black text-cyan-50'/>
//           </div>

//           <GenderCheckbox/>

//           <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black' to='/login'> 
//             Already have an account?
//           </Link>
          
//           <div>
//                     <button className='btn btn-block btn-sm mt-2 bg-red-600 text-white border border-none'>SignUp</button>
//                 </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp