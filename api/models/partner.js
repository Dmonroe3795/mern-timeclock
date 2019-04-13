const mongoose = require('mongoose');


const partnerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
    
});

module.exports = mongoose.model('Partner', partnerSchema);