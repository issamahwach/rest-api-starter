import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghigklmnopqrstuvwxyz1234567890', 10);

//typescript interface
export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"];
    title: string,
    description: string,
    price: number,
    image: string,
    createdAt: Date,
    updatedAt: Date,
}

//mongoose schema
const ProductSchema = new mongoose.Schema(
    {
        productId: {type: String, required: true, unique: true, default: () => `product_${nanoid()}`},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String},
    },
    {timestamps: true}
);



const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;