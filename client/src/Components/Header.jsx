import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../store/context';
import { server } from '../main';
import axios from "axios";


const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    const logoutHandler = () => {
        setLoading(true);
        try {
            const response = axios.get(`${server}/users/logout`,
                {
                    withCredentials: true
                }
            );
            toast.success("logged out successfully");
            setIsAuthenticated(false);
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);
            console.log('Error:', error);
            setLoading(false);
            setIsAuthenticated(true);
        }
    }
    return (
        <nav className='flex flex-col space-y-5 md:flex-row justify-between items-center px-8 py-4'>
            <div>
                <Link to="/">
                    <p className='text-white text-2xl font-bold tracking-wide'>FlavorBook</p>
                </Link>

            </div>
            <div className='flex space-x-4'>
                {/* <Link to="/" className='text-white  text-lg hover:text-gray-300'>Home</Link> */}
                <Link to="/saved" className='text-white  text-lg hover:text-gray-300'>Saved</Link>
                <Link to="/profile" className='text-white  text-lg hover:text-gray-300'>Profile</Link>

                {isAuthenticated ? (
                    <button
                        className='text-white  text-lg hover:text-gray-300'
                        onClick={logoutHandler}>Logout</button>
                ) : (
                    <Link to="/login" className='text-white  text-lg hover:text-gray-300'>Login</Link>

                )}

            </div>
        </nav>
    )
}

export default Header
