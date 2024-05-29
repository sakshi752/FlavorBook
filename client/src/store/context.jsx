import { Children, createContext, useState } from "react";

export const Context=createContext({});

const ContextProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(false);
    const [user, setUser] = useState({});

    return (
        <Context.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            user,
            setUser
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
