import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default blogSchema;

export const Blog = mongoose.model("Blog", blogSchema);