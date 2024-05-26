import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { deleteRecipe, getAllRecipes, getRecipesOfUser, newRecipe, updateRecipe, viewRecipe } from "../controllers/recipe.js";

const router=express.Router();

router.post("/new",isAuthenticated,newRecipe);
// this will give all recipes irrespective of the user
router.get("/all-recipes",getAllRecipes);
// this will give us recipes of a particular user only
router.get("/all-recipes-user",isAuthenticated,getRecipesOfUser);

// this is to perform manipulation on a particular recipe
router.route("/:id").get(isAuthenticated,viewRecipe).put(isAuthenticated,updateRecipe).delete(isAuthenticated,deleteRecipe);
export default router;