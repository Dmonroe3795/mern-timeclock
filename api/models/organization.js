const mongoose = require('mongoose');
const GroupSchema = require('group');

const organizationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    groups:[GroupSchema]
});

module.exports = mongoose.model('Organization', organizationSchema);