import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';
import Saved from './Pages/Saved.jsx';
import ViewRecipe from './Pages/ViewRecipe.jsx';
import RecipeUser from './Pages/RecipeUser.jsx';
import ContextProvider from './store/context.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/saved", element: <Saved /> },
      { path: "/view-recipe", element: <ViewRecipe /> },
      { path: "/recipe-user", element: <RecipeUser /> }
    ]
  }
]);

export const server = "http://localhost:4000/api/v1";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </ContextProvider>

  </React.StrictMode>,
)
