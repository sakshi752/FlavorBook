import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteRecipe, fetchSavedRecipe, getAllRecipes, getRecipesOfUser, getUser,newRecipe, saveRecipe, updateRecipe, viewRecipe } from "../controllers/recipe.js";
import {upload} from "../middleware/multerConfig.js";

const router=express.Router();

// add new recipe in authenticated user
router.post("/new",isAuthenticated,upload.single('file'),newRecipe);

// this will give us recipes of a authenticated user only
router.get("/all-recipes-user",isAuthenticated,getRecipesOfUser);

// this will give all recipes irrespective of the user, they will be displayed on home page
router.get("/all-recipes",getAllRecipes);

// view recipe details
router.get("/view-recipe/:recipeId",viewRecipe);

// this will give us author info of a particular recipe. author's info and his/her recipes will be returned
router.get("/user/:userId",getUser)

// this is to perform manipulation on a particular recipe
router.route("/:id").put(isAuthenticated,updateRecipe).delete(isAuthenticated,deleteRecipe);
export default router;

// save recipe
router.post("/save/:recipeId",isAuthenticated,saveRecipe);

// fetch saved Recipes
router.post("/saved-recipes",isAuthenticated,fetchSavedRecipe);
