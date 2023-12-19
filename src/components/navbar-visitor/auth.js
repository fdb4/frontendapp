import { useState, useContext, createContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    // const login = (auth) =>  {
    //     setAuth(auth)
    // }

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}