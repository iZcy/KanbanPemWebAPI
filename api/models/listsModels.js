const mongoose = require("mongoose");
const { Schema } = mongoose;

const listsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lists = mongoose.model("Lists", listsSchema);

module.exports = Lists;