import User from "../Models/user.model.js";
import bcrypt from "bcrypt"
import genToken from "../utils/genToken.js";
import jwt from "jsonwebtoken";

export const authCheck = async (req, res) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "User is UnAuthenticated!", isLoggedIn: false, user: {} })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({ message: "User is Authenticated!", isLoggedIn: true, user: decode })
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "User is UnAuthenticated!", isLoggedIn: false, user: {} })
    }

}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password < 6) {
            return res.status(400).json({ message: "Password must be greather than 6 charactor" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email not exists!" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user?.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "You inserted wrong password!" })
        }

        const token = genToken(user?._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true
        })
        return res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (password < 6) {
            return res.status(400).json({ message: "Password must be greather than 6 charactor" })
        }

        const isIserExists = await User.findOne({ email });
        if (isIserExists) {
            return res.status(400).json({ message: "User is already exists with this email!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, password: hashedPassword, email })

        const token = genToken(user?._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true
        })
        return res.status(201).json(user);
    } catch (error) {
        error.message = "Sign-up error"
        next(error);
    }
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true
        });
        res.status(200).json({ message: "User Signout successfully!" })
    } catch (error) {
        error.message = "Internal error! failed to logout"
        next(error);
    }
}