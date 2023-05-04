import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        countInStock: { type: Number, required: true },
        token: { type: String, required: true, unique: true },
        brand: { type: String, required: true },
        rating: {
            rate: { type: Number },
            count: { type: Number },
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;