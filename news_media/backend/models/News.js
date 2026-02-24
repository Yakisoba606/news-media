const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  author: {
    type: String,
    require: true,
  },

  types: {
    type: Array,
    require: true,
  },
} , { timestamps : true });

module.exports = mongoose.model("News", NewsSchema);
