const express = require('express');
const router = express.Router();

const userControl = require('../controller/user.controller');

router.post('/signup', userControl.handleSignup);
router.post('/login', userControl.handleLogin);
router.post('/authGoogle', userControl.authGoogle);
router.get('/logout', userControl.handleLogout);
router.post('/validate', userControl.handleValidateToken)
router.get('/getAll', userControl.getAllUsers)
router.put('/updateRole/:id', userControl.updateUserRole)
router.put('/updateProfile/:id', userControl.updateUserProfile)
router.delete("/delete/:id", userControl.deleteUser)

module.exports = router;