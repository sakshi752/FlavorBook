import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import { Context } from '../store/context';
import RecipeCard from '../Components/RecipeCard';

const Saved = () => {
  const { loading, setLoading } = useContext(Context);
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/saved-recipes`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data.savedRecipes);
      setSavedRecipes(res.data.savedRecipes);
      setLoading(false);
    }).catch(e => {
      console.error(e); // Log the error to see its structure
      toast.error("An error occurred while fetching saved recipes.");
      setLoading(false);
    })
  }, []);
  return (
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
        />
      ))}
    </div>
  )

}

export default Saved
