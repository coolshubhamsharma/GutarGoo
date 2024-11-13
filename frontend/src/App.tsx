import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import SignUp from "./pages/Signup/SignUp"
import Home from "./pages/Home/Home"
import { useAuthContext } from "./context/AuthContext"


function App() {

  const {authUser , isLoading} = useAuthContext(); //so that we can use the values inside the authContext
  console.log(authUser);

  if(isLoading){
    return null;
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path='/' element={ authUser ? <Home/> : <Navigate to={'/login'}/>}/>
        <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to={'/'}/>}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to={'/'}/>}/>
      </Routes>
    </div>
  )
}

export default App
