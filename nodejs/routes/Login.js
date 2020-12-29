const express = require('express');
const path = require('path');
const multer = require("multer");
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
const Login = require('../controllers/LoginDetails');
const Register = require('../controllers/RegistrationDetails');
const Forgotpassword = require('../controllers/Forgotpassword');
//Getting the phoneNumber from user and Adding into CustomerDetails Table   
router.post('/customer', Login.postcustomerdetails);
//Email signup registration
router.post('/login', Login.login);

router.post('/signup', Register.signup);
router.post('/signup1', Register.signup1);

//router.post('/send', Register.updateproduct);
//Forgot Email Password
router.post('/changepassword', Forgotpassword.changepassword);
module.exports = router;
