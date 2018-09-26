const User = require('../models/user');

/** ASYNC FUNCTIONS? */

const get_bookmarks = (req, res) => {
  res.status(200).send('GET REQUEST working');
}

const insert_bookmarks = (req, res) => {
  const { id } = req.params;

  res.status(200).send('POST REQUEST working, id: ' + id);
}

const delete_bookmarks = (req, res) => {
  const { id } = req.params;

  res.status(200).send('DELETE REQUEST working, id: ' + id);
  // res.status(204).send(); // 204: success without returning content
}

module.exports = {
  get_bookmarks,
  insert_bookmarks,
  delete_bookmarks
}