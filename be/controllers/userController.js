const COURTS = require('../Model/courtModel')
const COURTSCHEDULE = require('../Model/courtSchedule')
const ObjectId = require('mongoose').Types.ObjectId

const getAllCourtData = (req,res,next)=>{
     try {
        COURTS.find().then((result)=>{
            res.status(200).json(result)
       }).catch((err)=>{
            next()
       })

     } catch (error) {
        next()
     }
          
}

const getSingleCourtData = (async(req,res,next)=>{
    try {
      const courtData = await COURTS.findOne({_id:req.query.courtId})
      res.status(200).json(courtData)
    } catch (error) {
        next()
    }

})

const getSlotData = (req, res, next) => {
  try {
    let currentHour = 0;
    const currentDate = new Date(req.query.date);

    
    if (new Date().setUTCHours(0, 0, 0, 0) === currentDate.getTime()) {
      currentHour = new Date().getUTCHours(); 
    }

    COURTSCHEDULE.aggregate([
      {
        $match: {
          courtId: new ObjectId(req.query.courtId),
          date: currentDate,
          'slot.id': { $gte: currentHour }
        }
      },
      {
        $project: {
          _id: 1,
          date: 1,
          slot: 1,
          cost: 1,
          bookedBy: 1
        }
      }
    ])
      .then((result) => {
        // console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
    next();
  }
};


module.exports = {getAllCourtData,getSingleCourtData,getSlotData}