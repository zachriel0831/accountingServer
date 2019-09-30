const mongoose = require('mongoose');

const AccountingSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        index: { unique: false }
    },
    itemName: {
        type: String,
        index: { unique: false }
    },
    category: {
        type: String,
        index: { unique: false }
    },
    amount: {
        type:String,
        index: { unique: false }
    },
    sourceFlag:{
        type:String,
        index:{unique:false}
    },
    displayYear:{
        type:String,
        index:{unique:false}
    },
    displayMonth:{
        type:String,
        index:{unique:false}
    },
    displayDay:{
        type:String,
        index:{unique:false}
    },
    body: String,
    status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    remark: {
        type:String,
        index:{unique:false}
    },
});

module.exports = mongoose.model('Accounting', AccountingSchema);