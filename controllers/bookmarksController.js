// const shortid = require('shortid');
const User = require('../models/user');

/** ASYNC FUNCTIONS? */

const get_bookmarks = (req, res, next) => {
  // const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return next();
    res.status(200).send(user.bookmarks);
  });
};

const insert_bookmarks = (req, res, next) => {
  const { username, password, article } = req.body;

  User.findOneAndUpdate(
    { username },
    { $push: { bookmarks: { ...article } } },
    { new: true },
    (err, user) => {
    if (err) return next();
    res.status(200).send(user.bookmarks);
  });
};

const delete_bookmarks = (req, res, next) => {
  const { username, password } = req.body;
  const { id } = req.params;

  User.findOneAndUpdate(
    { username },
    { $pull: { bookmarks: { id }} },
    { new: true },
    (err, user) => {
    if (err) return next();
    res.status(200).send(user.bookmarks);
  });
}

module.exports = {
  get_bookmarks,
  insert_bookmarks,
  delete_bookmarks
}