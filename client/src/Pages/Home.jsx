import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/context'
import axios from "axios";
import { server } from '../main';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import RecipeCard from '../Components/RecipeCard'

const Home = () => {
  const {  loading } = useContext(Context);
  // this are recipes for storing all recipes
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/recipes/all-recipes`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.recipes);
        setAllRecipes(res.data.recipes);
      })
      .catch((e) => {
        console.error(e); // Log the error to see more details
        toast.error(e.response?.data?.message || 'An error occurred');
      });
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div className="bg-rose-50">
      {loading ? (
        <Loader />
      ) : (
          <div className='text-gray-900'>
            <h1 className='text-rose-500 mb-9 text-3xl text-center'>Recipe Blogs</h1>

            <section className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {allRecipes.map(({ _id, description, ingredient1, ingredient2, ingredient3, ingredient4, title,user,imageUrl }) => (
                <RecipeCard
                  key={_id}
                  recipeId={_id}
                  description={description}
                  ingredient1={ingredient1}
                  ingredient2={ingredient2}
                  ingredient3={ingredient3}
                  ingredient4={ingredient4}
                  title={title}
                  imageUrl={imageUrl}
                  userId={user._id}
                  userName={user.name}
                />
              ))}
            </section>
          </div>
      )}
    </div>
  )
}

export default Home
