import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../store/context';
import { server } from '../main';
import axios from "axios";
import { FaBars, FaTimes, FaSave, FaUser, FaSignInAlt, FaSignOutAlt,FaHome } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading,isMenuOpen,toggleMenu } = useContext(Context);
    

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
        <nav className='bg-rose-600 shadow-xl sticky top-0 z-10'>
            <div className='flex justify-between items-center py-2 px-3'>
                <Link to="/">
                    <p className='text-white text-3xl font-bold tracking-wide'>FlavorBook</p>
                </Link>
                <button className='text-white sm:hidden text-xl' onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes  /> : <FaBars />}
                </button>
                {/* links in large screen */}
                <div className='hidden sm:flex space-x-6'>
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
            {isMenuOpen && (
                <div className='sm:hidden flex flex-col space-y-5 px-3 pt-10 min-h-screen absolute top-0 left-0 w-[50%] bg-rose-600'>
                    <Link to="/" className='text-white text-xl hover:text-gray-300 flex items-center' onClick={toggleMenu}>
                        <FaHome className='mr-2' /> Home
                    </Link>
                    <Link to="/saved" className='text-white text-xl hover:text-gray-300 flex items-center' onClick={toggleMenu}>
                        <FaSave className='mr-2' /> Saved
                    </Link>
                    <Link to="/profile" className='text-white text-xl hover:text-gray-300 flex items-center' onClick={toggleMenu}>
                        <FaUser className='mr-2' /> Profile
                    </Link>
                    {isAuthenticated ? (
                        <button
                            className='text-white text-xl hover:text-gray-300 flex items-center'
                            onClick={() => { logoutHandler(); toggleMenu(); }}
                            disabled={loading}
                        >
                            <FaSignOutAlt className='mr-2' /> Logout
                        </button>
                    ) : (
                        <Link to="/login" className='text-white text-xl hover:text-gray-300 flex items-center' onClick={toggleMenu}>
                            <FaSignInAlt className='mr-2' /> Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
