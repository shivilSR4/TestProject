var express = require('express');
const { userAuth } = require('../middleware/autharization');
const {getAllCourtData,getSingleCourtData,getSlotData} = require('../controllers/userController')
var router = express.Router();



router.get('/getallcourtdata',userAuth,getAllCourtData);
router.get('/getsinglecourtdata',userAuth,getSingleCourtData)
router.get('/getslotdata',userAuth,getSlotData)


module.exports = router;
