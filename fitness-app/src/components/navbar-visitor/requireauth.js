import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "./auth";
import Cookies from 'js-cookie';

const RequireAuth = ( {children} ) => {
    const { auth } = useAuth()
    const { setAuth } = useAuth()
    const location = useLocation();
    let accessToken = ''
    if (Cookies.get('accessToken')) {
        accessToken = Cookies.get('accessToken')
        if (!auth.accessToken) {
            setAuth({accessToken})
        }
    }
    if (!accessToken) {
        return <Navigate to="/login" state={{ from:location }} replace />
    }
    return children
}

export default RequireAuth