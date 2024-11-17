import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type AuthUserType = { //defines shape of the authenticated users data i.e. its creating a type
    id: string;
    fullName:string;
    email:string;
    profilePic:string;
    gender:string;
}

const AuthContext = createContext<{ //using context Api to create a context that holds authUser,setAuthUser & isLoading
    authUser:AuthUserType | null; //defining the 'type' of the data
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({ //writing the values of the data
    authUser: null,
    setAuthUser: ()=>{},
    isLoading: true,

});

//components within the provider can access the shared data using useContext
export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

// its a component that wraps child components providing access to AuthContext , in the main file we wrap this component around the App component and the app component will work like a child component , all the child components of the App component will be able to access the AuthContext
export const AuthContextProvider = ({children}:{children:ReactNode})=>{

    const [authUser , setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading , setIsLoading] = useState(true)


    //logic will go here
    useEffect(()=>{
        const fetchAuthUser  = async ()=>{
            try{
                const res = await fetch("/api/auth/me"); //sending the req to the backend server
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error);
                }
                setAuthUser(data); // we have set the AuthUser = data, that means we can acces the user data at any point of time in the App component if the user is authenticated
            }
            catch(error:any){
                console.error(error);
                toast.error(error.message);
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchAuthUser();
    },[])

    return (
        <AuthContext.Provider value={{
            authUser,
            isLoading,
            setAuthUser,
        }}
        > {/* this is basically the part where the properties inside of the AuthContext are being passed to the children(App) components using the valule attribute */}
            {children}
        </AuthContext.Provider>
    );
};