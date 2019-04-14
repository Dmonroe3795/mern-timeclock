const mongoose = require('mongoose');


const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    activeGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    activeSession:{type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    totalHours: Number
});

module.exports = mongoose.model('Member', memberSchema);