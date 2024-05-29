import React, { useContext, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import { Context } from '../store/context';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("An error occurred. Please try again.");
      }
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex items-center justify-center  bg-rose-50">
      <section className="max-w-2xl w-full p-6 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mt-10 text-rose-600">Create account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:border-rose-500"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              disabled={loading}
              type='submit'
              className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 focus:outline-none focus:bg-rose-600"
            >
              Create account
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-gray-500">Or</h2>
            <Link to="/login" className="text-rose-500 hover:text-rose-600">Login</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
