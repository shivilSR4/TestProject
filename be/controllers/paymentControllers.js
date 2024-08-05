const ORDERS = require('../Model/ordersModel');
const COURTSCHEDULE = require('../Model/courtSchedule');
const Razorpay = require("razorpay");
const crypto = require('crypto')



const orders = async (req, res, next) => {
    try {
  

        
        if (!req.body.slotIds || !req.body.courtId) {
            return res.status(400).json({ message: 'Missing slotIds or courtId in request body' });
        }

        const slotData = await COURTSCHEDULE.find({ _id: { $in: req.body.slotIds } });
        console.log("Slot data found:", slotData);

        let totalCost = 0;
        for (let slot of slotData) {
            if (slot.bookedBy) {
                return res.status(400).json({ message: 'Slot has already been occupied' });
            } else {
                totalCost += slot.cost;
            }
        }

        const instance = new Razorpay({
            key_id: process.env.RP_KEY_ID,
            key_secret: process.env.RP_SECRET_KEY,
        });

        const newOrder = await ORDERS({
            courtId: req.body.courtId,
            slotIds: req.body.slotIds,
            totalCost: totalCost,
            bookedBy: req.userId,
        }).save();

        const options = {
            amount: totalCost * 100, 
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).send("Failed to create order in Razorpay");
        } else {
            console.log("Order created successfully:", order);
            res.status(200).json(order);
        }
    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





const verify = (async(req, res) => {
    try {
        
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            slotIds,
            courtId,receipt,date
        } = req.body;

        
        const shasum = crypto.createHmac("sha256", process.env.RP_SECRET_KEY);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

       
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

       await COURTSCHEDULE.updateMany({_id:{$in:slotIds}},{$set:{bookedBy:req.userId,orderId:receipt}})
       await ORDERS.updateOne({_id:receipt},{$set:{status:2,bookedBy:req.userId,courtId:courtId,date:new Date(date)}})

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

module.exports = { orders, verify };
