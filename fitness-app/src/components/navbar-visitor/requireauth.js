import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "./auth";
import Cookies from 'js-cookie';

const RequireAuth = ( {children} ) => {
    const { auth } = useAuth()
    const { setAuth } = useAuth()
    const location = useLocation();
    let id = ''
    if (Cookies.get('id')) {
        id = Cookies.get('id')
        if (!auth.id) {
            setAuth({id})
        }
    }
    if (!id) {
        return <Navigate to="/login" state={{ from:location }} replace />
    }
    return children
}

export default RequireAuth