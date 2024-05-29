import React, { useContext } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { Context } from '../store/context';

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {isAuthenticated ? (
            <div className='text-white flex items-center gap-5 flex-col mt-20 text-2xl font-semibold tracking-widest'>
              <h1>Welcome, {user.name}</h1>
            </div>
          ) : (
            <div className='text-white flex items-center gap-5 flex-col mt-20 text-2xl font-semibold tracking-widest'>
              <p >Please log in to view your profile...</p>
              <Link
              className='bg-slate-950 px-4 py-2 rounded-lg hover:bg-slate-700'
              to="/login"> Login</Link>
            </div>

          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
