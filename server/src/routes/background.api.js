const express = require('express');
const router = express.Router();

const backgroundControl = require('../controller/background.controller');

router.post('/create', backgroundControl.createBackground);
router.get('/getAll', backgroundControl.getBackground)
router.put('/update/:id', backgroundControl.updateBackground)
router.delete("/delete/:id", backgroundControl.deleteBackground)

module.exports = router;