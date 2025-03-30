import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, enum: ["Health & Wellness", "Medical News & Research", "Nutrition & Diet", "Disease Awareness & Prevention", "Mental Health"] }
}, { timestamps: true }); // Auto-creates createdAt & updatedAt

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blogModel;
