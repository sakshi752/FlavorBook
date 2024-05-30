import React, { useContext } from 'react'
import { Context } from '../store/context'
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

const Home = () => {
  const {isAuthenticated,loading,user}=useContext(Context);
  return (
    <div className="bg-rose-50">
      {loading?(
        <Loader/>
      ):(
        <div>
          {isAuthenticated?(
          <div className='text-gray-900 flex items-center gap-5 flex-col mt-10 text-2xl font-semibold tracking-widest'>
          <h1>Welcome, {user.name}</h1>
        </div>
          ):(
            <div className='text-gray-900 flex items-center gap-5 flex-col mt-10 text-2xl font-semibold tracking-widest'>
            <p>Please log in to view your Home...</p>
            <Link
              className='bg-rose-500 px-4 py-2 rounded-lg hover:bg-rose-600 text-white'
              to="/login"
            >
              Login
            </Link>
          </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
