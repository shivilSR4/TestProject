const mongoose = require('mongoose')
const scheduleSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    slot:{
        type:Object,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'orders'
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})
const courtSchedule = mongoose.model('courtSchedule',scheduleSchema)
scheduleSchema.index({date:1,'slot.id':1,courtId:1},{unique:true})
module.exports = courtSchedule