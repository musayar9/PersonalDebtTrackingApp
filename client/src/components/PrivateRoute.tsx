import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"


const PrivateRoute = () => {
    const {user} = useAppSelector((state)=>state.user)

  return (
    <>
    {user ? <Outlet/>: <Navigate to="/login"/>} 
    </>
  )
}

export default PrivateRoute