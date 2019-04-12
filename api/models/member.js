const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    totalHours: Number
});

module.exports = mongoose.model('Member', memberSchema);