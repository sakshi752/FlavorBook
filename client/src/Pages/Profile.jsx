import React, { useContext, useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { Context } from '../store/context';
import axios from "axios";
import toast from 'react-hot-toast';
import { server } from '../main';

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  // console.log(user);
  const [authenticatedRecipes, setAuthenticatedRecipes] = useState([]);
  useEffect(() => {
    axios.get(`${server}/recipes/all-recipes-user`, {
      withCredentials: true
    }).then(res => {
      setAuthenticatedRecipes(res.data.recipes);
    }).catch(e => {
      toast.error(e.response.data.message);
    })
  }, []);
  console.log(authenticatedRecipes);

  const handleDelete = () => {

  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        // this div will have authenticated content or non authenticated content
        <div>
          {
            isAuthenticated ? (
              <section>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">{user.name}'s Profile</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                {/* dashboard */}
                <div className=''>
                  {authenticatedRecipes.map((recipe, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center bg-rose-500 px-2 py-1 rounded">
                      <div className='flex gap-2'>
                        <img 
                        className='w-20 rounded'
                        src={recipe.imageUrl || "/dummy-recipe.jpg"} alt="" />
                        <h1 className='text-lg font-semibold'>{recipe.title}</h1>
                      </div>
                      <div className='flex gap-3'>
                        <Link to={`/recipe-post/${recipe._id}`} className='bg-rose-500 px-3 py-2 rounded text-white font-semibold text-lg'>View</Link>
                        <button onClick={() => handleDelete(recipe.id)}
                        className='bg-rose-500 px-3 py-2 rounded text-white font-semibold '
                        >Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className='flex flex-col items-center gap-7'>
                <h1 className='text-2xl font-semibold'>Login to access your recipes</h1>
                <Link
                  className='bg-rose-500 px-4 py-3 rounded text-white text-lg'
                  to={"/login"}>Login</Link>

              </div>
            )
          }
        </div>
      )}
    </>
  );
};

export default Profile;
