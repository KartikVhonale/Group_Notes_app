const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
});

const quouteModel = mongoose.model('quote', quoteSchema);
module.exports = quouteModel;