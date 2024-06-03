import { Children, createContext, useState } from "react";

export const Context=createContext({});

const ContextProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(false);
    const [user, setUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toggle,setToggle]=useState(false);

    // form data
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [ingredient1,setIngredient1]=useState("");
    const [ingredient2,setIngredient2]=useState("");
    const [ingredient3,setIngredient3]=useState("");
    const [ingredient4,setIngredient4]=useState("");
    const [imgUrl,setImgUrl]=useState("");


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setTitle("");
        setDescription("");
        setIngredient1("");
        setIngredient2("");
        setIngredient3("");
        setIngredient4("");
        setImgUrl("")
    };

    const toggleForm=()=>{
        setToggle(!toggle);
    }


    return (
        <Context.Provider
        value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            user,
            setUser,isMenuOpen, 
            setIsMenuOpen,toggleMenu,
            toggle,setToggle,
            toggleForm,
            title,setTitle,
            description,setDescription,
            ingredient1,setIngredient1,
            ingredient2,setIngredient2,
            ingredient3,setIngredient3,
            ingredient4,setIngredient4,
            imgUrl,setImgUrl
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
