import {Outlet} from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
import Header from "./Components/Header.jsx";

function App() {
 return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Header/>
      <div className="flex-grow ">
        <Outlet/>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
