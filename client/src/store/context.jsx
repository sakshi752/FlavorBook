import { Children, createContext, useState } from "react";

export const Context=createContext({});

const ContextProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(false);
    const [user, setUser] = useState({});

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <Context.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            user,
            setUser,isMenuOpen, 
            setIsMenuOpen,toggleMenu
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
