import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/context'
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../main';
import Loader from '../Components/Loader';
import RecipeCard from '../Components/RecipeCard';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AuthorInfo = () => {
  const { userId } = useParams();
  const { loading, setLoading } = useContext(Context);
  const [usersRecipe, setUsersRecipe] = useState([]);
  const [user, setUser] = useState({});
console.log(userId);
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/recipes/user/${userId}`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.user);
      setUsersRecipe(res.data.recipes);
      setLoading(false);
    }).catch((e) => {
      console.error(e); // Log the error to see more details
      toast.error(e.response?.data?.message || 'An error occurred');
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className='bg-rose-600 hover:bg-rose-700 inline-block px-4 py-4 rounded-full sticky top-20  z-10 mb-5'>
            <Link className='text-white font-bold text-xl' to={"/"}>
              <BiArrowBack />
            </Link>
          </div>
          <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{user.name}'s posts</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 tracking-widest'>
              {usersRecipe.map(({ _id, description, ingredient1, ingredient2, ingredient3, ingredient4, title,user }) => (
                <RecipeCard
                  key={_id}
                  _id={_id}
                  description={description}
                  ingredient1={ingredient1}
                  ingredient2={ingredient2}
                  ingredient3={ingredient3}
                  ingredient4={ingredient4}
                  title={title}
                  user={user}
                />
              ))}
            </div>
          </div>
          
        </section>
      )}
    </div>
  )
}

export default AuthorInfo
