const User = require('../models/user');

module.exports = {
  getAll,
  insertOne,
  removeOne
};

async function getAll() {
  return await User.findOne({ username: 'benoit' }).select('-password');
}

async function insertOne({ username, article }) {
  return await User.findOneAndUpdate(
    { username },
    {
      $push: { bookmarks: { ...article } },
      $set: { updatedDate: Date.now() }
    },
    { new: true })
  .select('-password');
}

async function removeOne({ username }, id) {
  return await User.findOneAndUpdate(
    { username },
    {
      $pull: { bookmarks: { id } },
      $set: { updatedDate: Date.now() }
    },
    { new: true })
  .select('-password');
}