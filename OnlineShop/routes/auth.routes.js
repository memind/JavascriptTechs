const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.signup);
router.get('/login', authController.getLogin);

module.exports = router;