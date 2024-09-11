import { User } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import { sendToken } from "../utils/sendToken.utils.js";
import errorHandler from "../middlewares/error.middleware.js";

export const register = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        let user = await User.findOne({
            email,
        })

        if (user) return next(new errorHandler("User Already Exist!", 409))

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        sendToken(user, res, 201, "User signedUp!")

    } catch (error) {

        next(error)

    }

}

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user) return next(new errorHandler("Task not found", 404))

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new errorHandler("Incorrect Password", 400))

        sendToken(user, res, 200, `Welcome, ${user.name}`);

    } catch (error) {

        next(error)

    }

}

export const logout = (req, res, next) => {

    try {

        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === 'Development' ? "lax" : "none",
            secure: process.env.NODE_ENV === 'Development' ? false : true,
        }).json({
            success: true,
            message: "User deleted!",
        })

    } catch (error) {

        next(error)

    }

}

export const getMyProfile = (req, res, next) => {

    try {

        res.status(200).json({
            success: true,
            user: req.user,
        });

    } catch (error) {

        next(error)

    }

}