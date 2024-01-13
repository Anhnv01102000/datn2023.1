const express = require('express');
const router = express.Router();
const cardControl = require('../controller/card.controller');

router.post('/create', cardControl.createCard);
router.put('/update/:id', cardControl.updateCard)
router.get('/getCardById/:id', cardControl.getCardById)
router.get("/getAll", cardControl.getAllCard)
router.get("/getCardByUser/:userId", cardControl.getCardByUser)
router.delete("/delete/:id", cardControl.deleteCard)
router.put("/likeCard/:id", cardControl.toggleLike)
router.get('/liked-Cards/:userId', cardControl.getLikedCards);
router.put('/change-owner/:id', cardControl.changeOwner)

module.exports = router;