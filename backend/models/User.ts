import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    piUsername: string;
    walletAddress: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
    piUsername: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
