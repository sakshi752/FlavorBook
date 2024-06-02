import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/context';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';


const RecipePost = () => {
  const { loading } = useContext(Context);
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  useEffect(() => {
    axios.get(`${server}/recipes/view-recipe/${recipeId}`, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data.recipe);
      setRecipe(res.data.recipe);
    }).catch((e) => {
      console.error(e); // Log the error to see more details
      toast.error(e.response?.data?.message || 'An error occurred');
    });
  }, [recipeId]);

  return (
    <section className=''>
      <div className='bg-rose-600 hover:bg-rose-700 inline-block px-4 py-4 rounded-full sticky top-20 z-10'>
      <Link className='text-white font-bold text-xl' to={"/"}>
      <BiArrowBack/>
      </Link>
      </div>
     
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <img src={recipe.imageUrl || "/dummy-recipe.jpg"} alt="Recipe" className="w-full md:h-96 object-cover rounded-md" />
      </div>
      <div className="mb-6">
        <div className='flex items-center justify-between mb-4'>
          <h1 className="text-3xl font-bold  text-gray-900">
            {recipe.title}
          </h1>
          <p className='text-xl'>By Sakshi Patel</p>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Ingredients:</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {recipe.ingredient1 && <li>{recipe.ingredient1}</li>}
          {recipe.ingredient2 && <li>{recipe.ingredient2}</li>}
          {recipe.ingredient3 && <li>{recipe.ingredient3}</li>}
          {recipe.ingredient4 && <li>{recipe.ingredient4}</li>}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description:</h2>
        <p className="text-gray-700">{recipe.description}</p>
      </div>
    </div>
    </section>
  );
}

export default RecipePost;
