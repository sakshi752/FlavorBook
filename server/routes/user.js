import express from "express";
import { getMyProfile, getSavedRecipes, login, logout, register, saveRecipe } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated,getMyProfile);
// Route to save a recipe for a user
router.post("/save-recipe", isAuthenticated, saveRecipe);
router.get("/saved-recipes",isAuthenticated,getSavedRecipes)

export default router;