import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "./auth";
import Cookies from 'js-cookie';

const RequireAuth = ( {children, allowedRoles} ) => {
    const { auth } = useAuth()
    const { setAuth } = useAuth()
    const location = useLocation();
    let id = ''
    let role = ''
    if (Cookies.get('id')) {
        id = Cookies.get('id')
        role = Cookies.get('role')
        if (!auth.id) {
            setAuth({id})
        }
    }
    if (!id) {
        return <Navigate to="/login" state={{ from:location }} replace />
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}

export default RequireAuth