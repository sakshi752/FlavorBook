import mongoose from "mongoose";

const recipeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    ingredient1:{
        type:String,
        required:true,
    },
    ingredient2:{
        type:String,
    },
    ingredient3:{
        type:String,
    },
    ingredient4:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

export const Recipe=mongoose.model("Recipe",recipeSchema);