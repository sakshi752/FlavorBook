import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated=async (req,res,next)=>{
    const {token}=req.cookies;

    // this will check weather user is logged in or not, if not then message will be shown
    if (!token) {
        return res.status(404).json({
            success:false,
            message:"login/register first"
        })
    };

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //    after login/ register our req.user will be having user's data
    req.user=await User.findById(decoded._id);
    next();

}