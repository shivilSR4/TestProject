const { response } = require('../app')
const COURTS = require('../Model/courtModel')
const COURTSCHEDULE = require('../Model/courtSchedule')
const ORDERS = require('../Model/ordersModel')
const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require ('mongoose')

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
  
    res.status(500).json({ message: "Internal server error" });
    next();
  }
};




const getOrderData = async (req, res) => {
  try {
    const userId = req.query.userId;

    
    const orders = await ORDERS.find({ bookedBy: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const court = await COURTS.findById(order.courtId);
        
       
        const slots = await COURTSCHEDULE.find({ _id: { $in: order.slotIds } });
     
        const slotTimes = slots.map(slot => slot.slot.name);
        const slotDate = slots.map(slot => slot.date);

        return {
          ...order._doc,
          courtName: court.name,
          courtLocation: court.location,
          courtAddress: court.address1,
          slotTimes, 
          slotDate 
        };
      })
    );

    res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.stack);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const orderCancel = async (req, res) => {
  try {
    const orderIds = req.body;  
    
    if (!orderIds || orderIds.length === 0) {
      return res.status(400).json({ message: 'No order IDs provided' });
    }

    
    const result = await ORDERS.deleteMany({ _id: { $in: orderIds } });

 
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No orders found to delete' });
    }

   
    res.status(200).json({ message: `${result.deletedCount} order(s) cancelled successfully` });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {getAllCourtData,getSingleCourtData,getSlotData,getOrderData,orderCancel}