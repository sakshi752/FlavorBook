import React, { useContext ,useState} from 'react';
import { Context } from '../store/context';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../main';

const RecipeForm = () => {
    const [file, setFile] = useState(null);
    const { setLoading, toggleForm,
        title, setTitle,
        description, setDescription,
        ingredient1, setIngredient1,
        ingredient2, setIngredient2,
        ingredient3, setIngredient3,
        ingredient4, setIngredient4, imgUrl, setImgUrl } = useContext(Context);
    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('file',file);
        try {
            setLoading(true);
            const { data } = await axios.post(`${server}/recipes/new`, {
                title,
                description,
                ingredient1,
                ingredient2,
                ingredient3,
                ingredient4,
                imageUrl: formdata
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            });
            toast.success(data.message);
            setTitle("");
            setDescription("");
            setIngredient1("");
            setIngredient2("");
            setIngredient3("");
            setIngredient4("");
            setImgUrl("");
            toggleForm();
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            toggleForm();
        }
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
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
                            placeholder='Enter Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 1'
                            required
                            value={ingredient1}
                            onChange={(e) => setIngredient1(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 2'
                            required
                            value={ingredient2}
                            onChange={(e) => setIngredient2(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 3'
                            required
                            value={ingredient3}
                            onChange={(e) => setIngredient3(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Ingredient 4'
                            required
                            value={ingredient4}
                            onChange={(e) => setIngredient4(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-white rounded cursor-pointer bg-yellow-800 focus:outline-none mb-4"
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500 mt-4"
                            placeholder='Enter Description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
