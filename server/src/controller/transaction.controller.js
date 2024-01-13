const Transaction = require('../models/transaction.model');

const createTransaction = async (req, res) => {
    console.log(req.body);
    const newTransaction = await Transaction.create(req.body)
    res.status(200).json({
        status: 'success',
        data: newTransaction,
    });
}

const getAllTransaction = async (req, res) => {
    const transactions = await Transaction.find()
        .populate({
            path: 'cardId',
            select: 'name',
        })
        .populate({
            path: 'payer',
            select: 'username',
        })
        .populate({
            path: 'seller',
            select: 'username',
        })
        .sort({ createdAt: -1 })
        .exec();

    res.status(200).json({
        status: 'success',
        data: transactions,
    });
}

const getTransactionsBySeller = (req, res) => {
    const sellerId = req.params.sellerId;
    console.log(sellerId);
    const transactions = Transaction.find({ seller: sellerId })
        .populate('cardId')
        .populate('payer')
        .exec();
    res.status(200).json({
        status: 'success',
        data: transactions,
    });
}

module.exports = {
    createTransaction,
    getAllTransaction,
    getTransactionsBySeller
}