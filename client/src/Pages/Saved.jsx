import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import { Context } from '../store/context';
import RecipeCard from '../Components/RecipeCard';
import Loader from '../Components/Loader';

const Saved = () => {
  const { loading, setLoading, isAuthenticated } = useContext(Context);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // setLoading(true);
    axios.get(`${server}/users/saved-recipes`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data.savedRecipes);
      setSavedRecipes(res.data.savedRecipes);
      // setLoading(false);
    }).catch(e => {
      toast.error(e.response.data.message);
      // setLoading(false);
    })
  }, [savedRecipes]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated ? (
          <div>
            {savedRecipes.length !== 0 ? (
              <div>
                <h1 className="text-4xl font-semibold mb-5">Saved Recipes</h1>
                <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 tracking-widest'>
                  {savedRecipes.map(({ _id, description, ingredient1, ingredient2, ingredient3, ingredient4, title, user, imageUrl }) => (
                    <RecipeCard
                      key={_id}
                      recipeId={_id}
                      description={description}
                      ingredient1={ingredient1}
                      ingredient2={ingredient2}
                      ingredient3={ingredient3}
                      ingredient4={ingredient4}
                      imageUrl={imageUrl}
                      title={title}
                      userId={user._id}  // Change to user._id
                      userName={user.name}  // Change to user.username
                      component="saved"
                    />
                  ))}
                </div>
              </div>

            ) : (
              <div className='flex flex-col items-center justify-center mt-20 text-xl font-bold'>
                <h1>You have no saved recipes!</h1>
                <Link className='bg-rose-500 hover:bg-rose-600 px-4 py-3 rounded text-white text-lg mt-5' to={"/"}>Browse recipes</Link>
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center gap-7'>
            <h1 className='text-2xl font-semibold'>Login to access your saved recipes</h1>
            <Link
              className='bg-rose-500 px-4 py-3 rounded text-white text-lg'
              to={"/login"}>Login</Link>
          </div>
        )
      )}
    </>
  );
}

export default Saved;
