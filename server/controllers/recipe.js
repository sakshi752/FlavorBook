import ErrorHandler from "../middleware/error.js";
import { Recipe } from "../models/recipe.js"; 
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