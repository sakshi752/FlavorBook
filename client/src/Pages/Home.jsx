import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/context'
import { Link } from 'react-router-dom';
import axios from "axios";
import { server } from '../main';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import RecipeCard from '../Components/RecipeCard'

const Home = () => {
  const { isAuthenticated, loading, user, } = useContext(Context);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/recipes/all-recipes`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.recipes);
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
            <h1 className='text-rose-500 mb-5 text-3xl'>Recipe Blogs</h1>

            <section className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 tracking-widest'>
              {allRecipes.map(({ _id, description, ingredient1, ingredient2, ingredient3, ingredient4, title }) => (
                <RecipeCard
                  key={_id}
                  _id={_id}
                  description={description}
                  ingredient1={ingredient1}
                  ingredient2={ingredient2}
                  ingredient3={ingredient3}
                  ingredient4={ingredient4}
                  title={title}
                />
              ))}
            </section>
          </div>
      )}
    </div>
  )
}

export default Home
