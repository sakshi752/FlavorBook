import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../store/context';
import { server } from '../main';
import axios from "axios";

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await axios.get(`${server}/users/logout`, { withCredentials: true });
            toast.success("Logged out successfully");
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
            setLoading(false);
            setIsAuthenticated(true);
        }
    };

    return (
        <nav className='bg-rose-600 shadow-xl sticky top-0'>
            <div className='flex flex-col md:flex-row justify-between items-center py-2 px-3 '>
                <div>
                    <Link to="/">
                        <p className='text-white text-3xl font-bold tracking-wide'>FlavorBook</p>
                    </Link>
                </div>
                <div className='flex space-x-6'>
                    <Link to="/saved" className='text-white text-lg hover:text-gray-300'>Saved</Link>
                    <Link to="/profile" className='text-white text-lg hover:text-gray-300'>Profile</Link>
                    {isAuthenticated ? (
                        <button
                            className='text-white text-lg hover:text-gray-300'
                            onClick={logoutHandler}
                            disabled={loading}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className='text-white text-lg hover:text-gray-300'>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
