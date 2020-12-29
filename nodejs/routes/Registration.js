const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

const Register = require('../controllers/RegistrationDetails');

router.post('/signup', Register.signup);
router.post('/Registeremail', Register.Registeremail);
// //validating OTP
router.post('/CreateAccount', Register.createaccount);

router.post('/OTPVALIDATION', Register.otpvalidation);

module.exports = router;