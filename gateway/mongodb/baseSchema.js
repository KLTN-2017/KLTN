const mongoose = require("mongoose");
const { Schema } = mongoose;

const baseMessageSchema = new Schema({
  id: String,
  message: [
    {
      key: Number,
      author: String,
      comments: {
        content: String,
        reply: [
          {
            email: String,
            content: String,
            like: { type: Number, default: 0 },
            heart: { type: Number, default: 0 },
            date: { type: Date, default: Date.now },
          },
        ],
      },
      like: { type: Number, default: 0 },
      heart: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = baseMessageSchema
