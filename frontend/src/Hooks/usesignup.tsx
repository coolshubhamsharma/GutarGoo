import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export type SignUpInputs = {
    fullName:string;
    username:string;
    password:string;
    confirmPassword:string;
    gender:string;
}

export type UseSignupReturnType = {
    loading: boolean;
    signup: (inputs: SignUpInputs) => Promise<void>;
};

const   usesignup = () : UseSignupReturnType => { //if we have defined a return type then we also have to return the value in a function
  const [loading, setLoading] = useState(false);
  const {setAuthUser} =  useAuthContext(); //here we are using the contextApi and destructuring the setAuthUser state and passing the data in the setAuthUser state
  
  const signup = async(inputs:SignUpInputs)=>{
    try{

        setLoading(true);

        const res =  await fetch("/api/auth/signup",{ //calling the signup api in the backend 
            method: "POST",
            headers:{
                "content-Type":"application/json",
            },
            body: JSON.stringify(inputs),
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error);
        }
        setAuthUser(data); //as we set the authUser here , it will takes us to the home page due to the condition we put in the App file i.e if true-->home
        
    }
    catch(error:any){
        console.error(error.message);
        toast.error(error.message);
    }
    finally{
        setLoading(false);
        
    }

  }
  return {loading , signup};

}

export default usesignup 
