const express = require('express');
const router = express.Router();
const imageassetsControl = require('../controller/imageassets.controller');

router.post('/upload', imageassetsControl.createImageAsset);
router.get('/all', imageassetsControl.getAllImageAsset);

module.exports = router;