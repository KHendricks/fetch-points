const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FetchSchema = new Schema({
  payer: { type: String },
  points: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

const FetchModel = mongoose.model("fetch", FetchSchema);

module.exports = FetchModel;
