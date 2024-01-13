const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Card',
            required: true,
        },
        payer: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        seller: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentInfo: {
            type: Object
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
