const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const verify_user = require('./auth');

router.post('/authenticate', verify_user, user_controller.authenticate);
router.post('/signup', user_controller.signUp);
router.post('/login', user_controller.logIn);
router.post('/logout', user_controller.logOut);

module.exports = router;