import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: Array<{ productId: mongoose.Schema.Types.ObjectId; quantity: number }>;
}

const CartSchema: Schema = new Schema<ICart>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
