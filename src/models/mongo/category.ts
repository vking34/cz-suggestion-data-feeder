import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, 'Category ID is required!']
        },
        categories: [String]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)


export default mongoose.model('categories', CategorySchema);