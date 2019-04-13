const mongoose = require('mongoose');
const MemberSchema = require('member');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    members: [MemberSchema]
});

module.exports = mongoose.model('Group', groupSchema);