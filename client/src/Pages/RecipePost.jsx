import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/context';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';

const RecipePost = () => {
  const { loading,setLoading } = useContext(Context);
  const [recipe, setRecipe] = useState({});
  const { recipeId,userName } = useParams();

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/recipes/view-recipe/${recipeId}`, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data.recipe);
      setRecipe(res.data.recipe);
      setLoading(false)
    }).catch((e) => {
      console.error(e); // Log the error to see more details
      toast.error(e.response?.data?.message || 'An error occurred');
      setLoading(false)
    });
  }, [recipeId]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <section >
          <div className='bg-rose-600 hover:bg-rose-700 inline-block px-4 py-4 rounded-full sticky top-20 lg:left-24 z-10 mb-5'>
            <Link className='text-white font-bold text-xl' to={"/"}>
              <BiArrowBack />
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
                {/* <Link className='text-xl hover:text-rose-500 cursor-pointer font-bold' to={''}>By {userName}</Link> */}
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
      )}
    </div>


  );
}

export default RecipePost;
