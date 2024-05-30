import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteRecipe, getAllRecipes, getRecipesOfUser, getUser,newRecipe, updateRecipe, viewRecipe } from "../controllers/recipe.js";

const router=express.Router();

// add new recipe in authenticated user
router.post("/new",isAuthenticated,newRecipe);

// this will give us recipes of a authenticated user only
router.get("/all-recipes-user",isAuthenticated,getRecipesOfUser);

// this will give all recipes irrespective of the user
router.get("/all-recipes",getAllRecipes);

// this will give us author info of a particular recipe
router.get("/:userId",getUser)

// this is to perform manipulation on a particular recipe
router.route("/:id").get(isAuthenticated,viewRecipe).put(isAuthenticated,updateRecipe).delete(isAuthenticated,deleteRecipe);
export default router;