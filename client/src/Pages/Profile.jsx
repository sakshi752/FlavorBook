import React, { useContext } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { Context } from '../store/context';

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return (
    <div className="bg-rose-50 flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          {isAuthenticated ? (
            <div className='text-gray-900 flex items-center gap-5 flex-col mt-10 text-2xl font-semibold tracking-widest'>
              <h1>Welcome, {user.name}</h1>
            </div>
          ) : (
            <div className='text-gray-900 flex items-center gap-5 flex-col mt-10 text-2xl font-semibold tracking-widest'>
              <p>Please log in to view your profile...</p>
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
  );
};

export default Profile;
