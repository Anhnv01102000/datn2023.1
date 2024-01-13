const express = require('express');
const router = express.Router();
const imageassetsControl = require('../controller/imageassets.controller');

router.post('/upload', imageassetsControl.creatImageAsset);
router.get('/all', imageassetsControl.getAllImageAsset);

module.exports = router;