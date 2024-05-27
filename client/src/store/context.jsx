import { Children, createContext, useState } from "react";

export const Context=createContext({});

const ContextProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(false);

    return (
        <Context.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
