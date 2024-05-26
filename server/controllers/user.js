import ErrorHandler from '../middleware/error.js';
import { User } from '../models/user.js';
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
        success:true,
        message:"you are logged out"
    })
};

export const getMyProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
};