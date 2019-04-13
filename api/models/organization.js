const mongoose = require('mongoose');


const organizationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    groups:[{type: Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('Organization', organizationSchema);