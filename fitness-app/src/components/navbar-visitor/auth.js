import { useState, useContext, createContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(null)

    const login = (loggedIn) =>  {
        setLoggedIn(loggedIn)
    }

    return (
        <AuthContext.Provider value={{ loggedIn, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}