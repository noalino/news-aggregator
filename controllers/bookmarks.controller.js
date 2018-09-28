const User = require('../models/User');

const get_bookmarks = async (req, res, next) => {
  /** Send username somehow */
  // bookmarksService.getAll()
  //   .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
  //   .catch(err => next(err));

  const { username } = req.user;
  const user = await User.findOne({ username }).select('-password');

  res.json(user.bookmarks);
};

const insert_bookmark = async (req, res, next) => {

  // bookmarksService.insertOne(req.body)
  //   .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
  //   .catch(err => next(err));

  const { username } = req.user;
  const { article } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    {
      $push: { bookmarks: { ...article } },
      $set: { updatedAt: Date.now() }
    },
    { new: true }
  ).select('-password');

  res.json(user.bookmarks);
};

const remove_bookmark = async (req, res, next) => {

  // bookmarksService.removeOne(req.body, req.params.id)
  //   .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
  //   .catch(err => next(err));

  const { username } = req.user;
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { username },
    {
      $pull: { bookmarks: { id } },
      $set: { updatedAt: Date.now() }
    },
    { new: true }
  ).select('-password');

  res.json(user.bookmarks);
}

module.exports = {
  get_bookmarks,
  insert_bookmark,
  remove_bookmark
}