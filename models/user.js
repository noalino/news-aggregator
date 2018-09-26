const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  bookmarks: [
  //   {
  //   id: String,
  //   title: String,
  //   description: String,
  //   source: String,
  //   publishedDate: Date
  // }
]
});

module.exports = User = mongoose.model('user', userSchema);