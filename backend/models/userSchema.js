import mongoose from "mongoose";
import validator from 'validator';
import blogSchema from './blogSchema.js';


const blogUser = new mongoose.Schema({

    name: { type: String, required: true },

    password: { type: String, required: true },

    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Please enter a valid email address',
        }
    },

    role: { type: String, default: "0" },

    blogs: [blogSchema]

}, { timestamps: true });

export const User = mongoose.model("User", blogUser);