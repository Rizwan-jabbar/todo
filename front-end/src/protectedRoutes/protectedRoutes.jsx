import { Outlet } from "react-router-dom"
import Login from "../components/login/login"
import token from "../../../back-end/data/token"


function ProtectedRoutes () {

    if(!token){
        return <Login/>
    }

    return (
        <Outlet/>
    )
   
}

export default ProtectedRoutes