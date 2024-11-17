import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";




const useLogout = () => {

  const [loading , setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async ()=>{
    setLoading(true);
    try{

       const res = await fetch("/api/auth/logout",{
        method:"POST",
        // headers:{"content-type":"application/json"}, beacause we are not sending any body
       });

       const data = await res.json();
       if(!res.ok){
        console.log("error getting logout response");
        throw new Error(data.error);
       }

       setAuthUser(null); //so that we can take the user back to the login page (look in the app.tsx )

    }
    catch(error:any){
        console.error(error.message);
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  };

  return {loading, logout};
};

export default useLogout