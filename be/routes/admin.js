const express = require('express');
const router = express.Router();

const multer = require('multer');
const { adminAuth } = require('../middleware/autharization');
const {createnewcourt,CreateSchedule} = require('../controllers/adminController')
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/images')
  },

  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now() +file.originalname)
  }
})
const upload = multer({storage:storage})

router.post('/createnewcourt',adminAuth,upload.array('files'),createnewcourt );

router.post('/createschedules',adminAuth,CreateSchedule)

module.exports = router;
