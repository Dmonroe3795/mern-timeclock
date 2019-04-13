const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}]
});

module.exports = mongoose.model('Group', groupSchema);