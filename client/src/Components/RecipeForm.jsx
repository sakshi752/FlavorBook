import React, { useContext } from 'react';
import { Context } from '../store/context';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

const RecipeForm = () => {
    const { toggleForm } = useContext(Context);
    const submitHandler = (e) => {
        e.preventDefault();
        // Add form submission logic here
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-30 bg-slate-900 z-10">
            <div className='shadow-md rounded bg-white w-[90vw] md:w-[50vw] lg:w-[40vw] h-[50vh] text-white px-4 py-10'>
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
                <form onSubmit={submitHandler} className="mt-8 space-y-6">
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
                            placeholder='Enter Title'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Description'
                            required
                        />
                    </div>
                    <div>
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
