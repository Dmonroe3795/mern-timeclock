const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    partner: {type: mongoose.Schema.Types.ObjectId, ref: 'Partner'},
    member:{type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    timeIn: Date,
    timeOut: Date,
    duration: Number
});

module.exports = mongoose.model('Session', sessionSchema);