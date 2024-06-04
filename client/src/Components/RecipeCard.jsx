import React from 'react';
import { Link } from 'react-router-dom';
const RecipeCard = ({ _id, description,title, userId,userName ,imageUrl}) => {
    // Truncate long descriptions and titles
    const shortDescription = description.length > 70 ? description.substr(0, 70) + '...' : description;
    const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
    return (
        <div className=" bg-white rounded shadow-md">
            {/* img */}
            <div className="h-60">
                <img src={imageUrl} alt="Recipe Image" className="w-full h-full object-cover object-center" />
            </div>
            {/* other details */}
            <div className="px-4 py-3 flex flex-col gap-4">
                {/* title and desc */}
                <div>
                    <h1 className=" text-2xl font-semibold text-gray-900 mb-1">{shortTitle}</h1>
                    <p className="text-md text-gray-700">{shortDescription}</p>
                </div>
                {/* author name and view, save button */}
                <div className='flex justify-between items-center'>
                    <Link className=" text-lg  text-gray-900 hover:text-rose-500 mb-2 font-semibold"
                    to={`/user/${userId}`}>
                       By {userName}
                    </Link>
                    <div className=' flex gap-4'>
                        <Link className='bg-rose-500 px-3 py-2 rounded text-white'
                        to="/saved">
                            Save
                        </Link>
                        <Link className='bg-rose-500 px-3 py-2 rounded text-white' 
                        to={`/recipe-post/${_id}`}>
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
