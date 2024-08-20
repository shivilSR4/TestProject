var express = require('express');
const { userAuth } = require('../middleware/autharization');
const {getAllCourtData,getSingleCourtData,getSlotData,getOrderData,orderCancel} = require('../controllers/userController')
var router = express.Router();



router.get('/getallcourtdata',userAuth,getAllCourtData);
router.get('/getsinglecourtdata',userAuth,getSingleCourtData)
router.get('/getslotdata',userAuth,getSlotData)
router.get('/getorderdata',userAuth,getOrderData)
router.post('/ordercancel',userAuth,orderCancel)


module.exports = router;
