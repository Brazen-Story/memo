const mongoose = require("mongoose");

const memolistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("memolist", memolistSchema);
