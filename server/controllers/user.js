import ErrorHandler from '../middleware/error.js';
import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';
import bcrypt from "bcrypt";
import { sendCookie } from '../utils/features.js';

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are present
        if (!name || !email || !password) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        // check len of password
        if (password.length < 4) return next(new ErrorHandler("password's len must be greater than 4", 400))

        let user = await User.findOne({ email });
        // check if user already exists or not
        if (user) return next(new ErrorHandler("User already exist"), 400);

        const hashedPw = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPw

        });

        sendCookie(user, res, `${user.name} you are registered successfully`)

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // Check if all fields are present
        if (!email || !password) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid mail or password"), 400);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid password"), 400);

        sendCookie(user, res, `welcome, ${user.name}`, 200);

    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: "you are logged out"
    })
};

export const getMyProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
};
// saved recipes
export const saveRecipe =async (req, res, next) => {
        try {
            const {id} = req.body;
            const userId = req.user._id;

            // Check if the recipe exists
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                return res.status(404).json({ success: false, message: "Recipe not found" });
            }

            // Check if the recipe is already saved by the user
            const user = await User.findById(userId);
            if (user.savedRecipes.includes(id)) {
                return res.status(400).json({ success: false, message: "Recipe already saved" });
            }

            // Save the recipe ID to the user's savedRecipes array
            user.savedRecipes.push(id);
            await user.save();

            res.status(200).json({ success: true, message: "Recipe saved successfully" });
        } catch (error) {
            next(error);
        }
 };

 export const getSavedRecipes = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find the user by ID and populate the savedRecipes field to get the details of each saved recipe
        const user = await User.findById(userId).populate('savedRecipes _id name');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // // Extract the saved recipes from the user object
        // const savedRecipes = user.savedRecipes;

        // // Extract user details
        // const { username, _id } = user;

        res.status(200).json({ success: true, user});
    } catch (error) {
        next(error);
    }
};
