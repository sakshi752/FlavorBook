import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";
import { errorMiddleware } from "./middleware/error.js";

export const app=express();

config({
    path:"./data/config.env"
});

app.use(cookieParser());
app.use(express.json());

// mount routers
app.use("/api/v1/users",userRouter);
app.use("/api/v1/recipes",recipeRouter);

app.get("/",(req,res)=>{
    res.send("working")
});

// using error middleware
app.use(errorMiddleware);