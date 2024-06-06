import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import { Context } from '../store/context';

const RecipeCard = ({ recipeId, description, title, userId, userName, imageUrl, component }) => {
    // Truncate long descriptions and titles
    const { isAuthenticated } = useContext(Context);
    const shortDescription = description.length > 70 ? description.substr(0, 70) + '...' : description;
    const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    const handleSaveRecipe = async (id) => {
        try {
            // Make a POST request to save the recipe
            const { data } = await axios.post(`${server}/users/save-recipe`,
                {
                    id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const handleUnsaveRecipe = async (id) => {
        try {
            // Make a POST request to unsave the recipe
            const { data } = await axios.post(`${server}/users/unsave-recipe`,
                {
                    id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    const handleButtonClick = () => {
        if (component === "saved") {
            handleUnsaveRecipe(recipeId);
        } else {
            handleSaveRecipe(recipeId);
        }
    }

    return (
        <div className="bg-white rounded shadow-md">
            {/* img */}
            <div className="h-60">
                <img src={imageUrl} alt="Recipe Image" className="w-full h-full object-cover object-center" />
            </div>
            {/* other details */}
            <div className="px-4 py-3 flex flex-col gap-4">
                {/* title and desc */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">{shortTitle}</h1>
                    <p className="text-md text-gray-700">{shortDescription}</p>
                </div>
                {/* author name and view, save button */}
                <div className='flex justify-between items-center'>
                    <Link className="text-lg text-gray-900 hover:text-rose-500 mb-2 font-semibold"
                        to={`/user/${userId}`}>
                        By {userName}
                    </Link>
                    <div className='flex gap-4'>
                        <button className='bg-rose-500 px-3 py-2 rounded text-white'
                            onClick={handleButtonClick}
                        >
                            {component === "saved" ? "Unsave" : "Save"}
                        </button>
                        <Link className='bg-rose-500 px-3 py-2 rounded text-white'
                            to={`/recipe-post/${recipeId}`}>
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
