import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/context'
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../main';
import Loader from '../Components/Loader';
import RecipeCard from '../Components/RecipeCard';

const AuthorInfo = () => {
  const { userId } = useParams();
  console.log(userId);
  const [usersRecipe, setUsersRecipe] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`${server}/recipes/user/${userId}`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.user);
      setUsersRecipe(res.data.recipes);
    }).catch((e) => {
      console.error(e); // Log the error to see more details
      toast.error(e.response?.data?.message || 'An error occurred');
    });
  },[]);
  console.log(user);
  return (
    <div>
      {/* <h1>{user.name}</h1> */}
    </div>
  )
}

export default AuthorInfo
