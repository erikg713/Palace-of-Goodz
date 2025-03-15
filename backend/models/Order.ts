import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    paymentId: string;
    productId: mongoose.Schema.Types.ObjectId;
    buyer: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
    paymentId: { type: String, required: true, unique: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);

