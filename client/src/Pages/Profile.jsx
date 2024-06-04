import React, { useContext, useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { Context } from '../store/context';
import axios from "axios";
import toast from 'react-hot-toast';
import { server } from '../main';
import RecipeForm from '../Components/RecipeForm';

const Profile = () => {
  const { isAuthenticated, loading, user, toggle, toggleForm } = useContext(Context);
  // those are recipes for dashboard of authenticated user
  const [authenticatedRecipes, setAuthenticatedRecipes] = useState([]);
  useEffect(() => {
    axios.get(`${server}/recipes/all-recipes-user`, {
      withCredentials: true
    }).then(res => {
      setAuthenticatedRecipes(res.data.recipes);
    }).catch(e => {
      toast.error(e.response.data.message);
    })
  }, [authenticatedRecipes]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/recipes/${id}`, {
        withCredentials: true
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);

    }
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
                  <button
                    onClick={toggleForm}
                    className='mt-3 px-5 py-3 rounded text-white font-semibold bg-rose-500 '>Add Recipes</button>
                </div>
                {
                  toggle && <RecipeForm />
                }
                {/* dashboard */}
                <div className=''>
                  {authenticatedRecipes.map((recipe, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center bg-rose-500 px-2 py-1 rounded">
                      <div className='flex gap-2'>
                        <img
                          className='w-20 rounded'
                          src={"/dummy-recipe.jpg"} alt="" />
                        <h1 className='text-lg font-semibold text-white'>{recipe.title}</h1>
                      </div>
                      <div className='flex gap-3'>
                        {/* <Link to={`/recipe-post/${recipe._id}`} className='bg-rose-500 px-3 py-2 rounded text-white font-semibold text-lg hover:text-gray-300'>View</Link> */}
                        <button onClick={() => handleDelete(recipe._id)}
                          className='bg-rose-500 px-3 py-2 rounded text-white font-semibold hover:text-gray-300'
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
