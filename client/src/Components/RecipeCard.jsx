import React from 'react';
import { Link } from 'react-router-dom';
const RecipeCard = ({ _id, description, ingredient1, ingredient2, ingredient3, ingredient4, title }) => {
    // Truncate long descriptions and titles
    const shortDescription = description.length > 70 ? description.substr(0, 70) + '...' : description;
    const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    return (
        <div className=" bg-white rounded shadow-md">
            <div className="">
                <img src="/dummy-recipe.jpg" alt="Recipe Image" className="w-full h-48 object-cover object-center" />
            </div>
            <div className="p-4 flex flex-col gap-8">
                <div>
                    <h1 className=" text-2xl font-semibold text-gray-900 mb-2">{shortTitle}</h1>
                    <p className="text-md text-gray-700">{shortDescription}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <Link className=" text-lg  text-gray-900 mb-2">
                        By sakshi Patel
                    </Link>
                    <div className=' flex gap-10'>
                        <Link >
                            Save
                        </Link>
                        <Link to="/recipe-post/1">
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
