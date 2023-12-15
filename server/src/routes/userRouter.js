const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', authController.signup);
router.post('/login', authController.signIn);

router.route('/').get(authController.protect, userController.getAllUsers);
router.route('/:id').get(authController.protect, userController.getUser);

module.exports = router;
