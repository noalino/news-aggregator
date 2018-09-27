const bookmarksService = require('../services/bookmarks.service');

const get_bookmarks = (req, res, next) => {

  /** Send username somehow */
  bookmarksService.getAll()
    .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
    .catch(err => next(err));
};

const insert_bookmark = (req, res, next) => {

  bookmarksService.insertOne(req.body)
    .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
    .catch(err => next(err));
};

const remove_bookmark = (req, res, next) => {

  bookmarksService.removeOne(req.body, req.params.id)
    .then(user => user ? res.json(user.bookmarks) : res.sendStatus(404))
    .catch(err => next(err));
}

module.exports = {
  get_bookmarks,
  insert_bookmark,
  remove_bookmark
}