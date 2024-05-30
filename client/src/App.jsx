import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Components/Header.jsx";
import { useContext, useEffect } from "react";
import { Context } from "./store/context.jsx";
import axios from "axios";
import { server } from "./main.jsx";

function App() {
  const { setUser, setIsAuthenticated, setLoading,isMenuOpen } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch(err => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-rose-50 text-gray-900">
      <Header />
      <div className="flex-grow py-4 px-6 md:px-28 mt-10 ">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
