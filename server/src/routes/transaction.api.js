const express = require('express');
const router = express.Router();
const transactionControl = require('../controller/transaction.controller');

router.post('/create', transactionControl.createTransaction);
router.get('/getAll', transactionControl.getAllTransaction);
router.get('/transactionsBySeller/:sellerId', transactionControl.getTransactionsBySeller);

module.exports = router;