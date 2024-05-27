import ErrorHandler from "../middleware/error.js";
import { Recipe } from "../models/recipe.js"; 
import { User } from "../models/user.js";
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

export const getUserOfRecipe = async (req, res, next) => {
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

export const deleteRecipe=async (req,res,next)=>{
    try {
        const recipe=await Recipe.findById(req.params.id);
        if (!recipe) return next(new ErrorHandler("Recipe not found"),404);

        await recipe.deleteOne();

        res.status(200).json({
            success:true,
            message:"Recipe deleted"
        })
    } catch (error) {
        next(error);
    }
};

export const viewRecipe=async(req,res,next)=>{
    try {
        const recipe=await Recipe.findById(req.params.id);
        if (!recipe) return next(new ErrorHandler("Recipe not found"),404);

        res.status(200).json({
            success:true,
            recipe

        })
    } catch (error) {
        next(error);
    }
}

export const updateRecipe=async(req,res,next)=>{
    
}