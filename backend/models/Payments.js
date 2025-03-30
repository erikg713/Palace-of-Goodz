

const paymentSchema = new mongoose.Schema({
    userId: {
        postgresql 17.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'ETH', 'BTC'] // Add more as needed
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'crypto'] // Add more as needed
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field automatically
paymentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
