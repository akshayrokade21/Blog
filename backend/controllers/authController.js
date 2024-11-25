import argon2 from "argon2";
import { User } from "../models/userSchema.js";
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, role, blogs } = req.body
        if (!name || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }
        const hashedPass = await argon2.hash(password)

        await User.create({
            name,
            email,
            password: hashedPass,
            role,
            blogs
        });
        res.status(200).send({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        return res.status(201).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
    }
}
export const logoutController = async (req, res) => {
    try {
        return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
            message: "user logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}