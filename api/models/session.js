const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    partner: {type: Schema.Types.ObjectId, ref: 'Partner'},
    member:{type: Schema.Types.ObjectId, ref: 'Member'},
    timeIn: Date,
    timeOut: Date
});

module.exports = mongoose.model('Session', sessionSchema);