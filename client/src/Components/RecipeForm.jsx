import React, { useContext } from 'react';
import { Context } from '../store/context';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

const RecipeForm = () => {
    const { toggleForm, 
        title, setTitle,
        description, setDescription,
        ingredient1, setIngredient1,
        ingredient2, setIngredient2,
        ingredient3, setIngredient3,
        ingredient4, setIngredient4 } = useContext(Context);
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("added");
        toggleForm()
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-30 bg-slate-900 z-10">
            <div className='shadow-md rounded bg-white w-[90vw] md:w-[50vw] lg:w-[40vw] h-[50vh] overflow-y-auto text-white px-4 py-10'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-semibold text-rose-600'>
                        Add Recipe
                    </h1>
                    <button
                        className='text-3xl font-semibold text-rose-600'
                        onClick={toggleForm}>
                        <AiOutlineCloseCircle />
                    </button>
                </div>
                <form onSubmit={submitHandler} className="mt-8">
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
                            placeholder='Enter Title'
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 1'
                            required
                            value={ingredient1}
                            onChange={(e)=>setIngredient1(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 2'
                            required
                            value={ingredient2}
                            onChange={(e)=>setIngredient2(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 3'
                            required
                            value={ingredient3}
                            onChange={(e)=>setIngredient3(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 4'
                            required
                            value={ingredient4}
                            onChange={(e)=>setIngredient4(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Description'
                            required
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className='mt-5'>
                        <button className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 focus:outline-none focus:bg-rose-600">
                            Add Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecipeForm;
