import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";




const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext(); //getitng from the authContext

    const login = async (username:string,password:string)=>{
        setLoading(true);

        try{
            const res = await fetch("/api/auth/login",{ //sending the username and password to the server to check the credentials
                method:"POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({username,password}),
            })

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            
            setAuthUser(data);

        }
        catch(error:any){
            console.log("error logging in",error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }


  return {loading , login};
}

export default useLogin