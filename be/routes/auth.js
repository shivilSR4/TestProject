var express = require('express');
var router = express.Router();
const {doSignup,doLogin,verifyotp,resendopt} = require('../controllers/authContoller')

/* GET home page. */
router.post('/doSignup', doSignup);

router.post('/doLogin', doLogin);

router.post('/verifyOtp',verifyotp)

router.post('/resendopt',resendopt)

module.exports = router;
