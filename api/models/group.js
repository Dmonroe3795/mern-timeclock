const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  emailWhiteList: [String],
  requireWhiteList: Boolean,
  isArchived: Boolean
});

module.exports = mongoose.model("Group", groupSchema);
