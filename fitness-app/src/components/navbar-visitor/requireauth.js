import { useAuth } from "./auth"
import { Navigate } from "react-router-dom"
export const RequireAuth = ({children}) => {
    const auth = useAuth()

    if(!auth.user === "Client") {
        return <Navigate to="/login" />
    }
    return children
}