import ErrorHandler from "../middleware/error.js";
import { Recipe } from "../models/recipe.js"; 
import { User } from "../models/user.js";

// add new recipe in authenticated user
export const newRecipe=async (req,res,next)=>{
    try {
        const {title,ingredient1,ingredient2,ingredient3,ingredient4,description,imageUrl}=req.body;
        const recipe=await Recipe.create({
            title,ingredient1,ingredient2,ingredient3,ingredient4,description,imageUrl,user:req.user
        });
        res.status(201).json({
            success:true,
            message:"Recipe added"
        })
        
    } catch (error) {
        next(error);
    }
  
};

// this will give us recipes of a authenticated user only
export const getRecipesOfUser=async (req,res,next)=>{
    try {
        const userId=req.user._id;
        const recipes=await Recipe.find({user:userId});

        res.status(200).json({
            success:true,
            recipes
        })
    } catch (error) {
        next(error);
    }
}

// this will give all recipes irrespective of the user, they will be displayed on home page
export const getAllRecipes=async (req,res,next)=>{
    try {
        const recipes=await Recipe.find();
        res.status(200).json({
            success:true,
            recipes
        })
    } catch (error) {
        next(error);
    }
};

// view recipe details
export const viewRecipe=async(req,res,next)=>{
    try {
        const recipe=await Recipe.findById(req.params.recipeId);
        if (!recipe) return next(new ErrorHandler("Recipe not found"),404);

        res.status(200).json({
            success:true,
            recipe

        })
    } catch (error) {
        next(error);
    }
}

// this will give us author info of a particular recipe. author's info and his/her recipes will be returned
export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Fetch user profile and recipes concurrently
        const [user, recipes] = await Promise.all([
            User.findById(userId),
            Recipe.find({ user: userId })
        ]);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (!recipes || recipes.length === 0) {
            return next(new ErrorHandler("No recipes found for this user", 404));
        }

        res.status(200).json({
            success: true,
            user,
            recipes
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// deletes recipe
export const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return next(new ErrorHandler("Recipe not found", 404));

        console.log(recipe.user._id.toString());
        console.log(req.user._id.toString());

        if (recipe.user._id.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("User is not authenticated", 403)); // Use 403 for forbidden
        }

        await recipe.deleteOne();

        res.status(200).json({
            success: true,
            message: "Recipe deleted"
        });
    } catch (error) {
        next(error);
    }
};




export const updateRecipe=async(req,res,next)=>{
    
}