const User = require('../models/user');

/** ASYNC FUNCTIONS? */

const create_user = (req, res) => {
  res.status(201).send('POST REQUEST working');
}

const modify_user = (req, res) => { // Change password
  const { username } = req.params;
  res.status(200).send('PUT REQUEST working, username: ' + username);
}

const delete_user = (req, res) => {
  const { username } = req.params;
  res.status(200).send('DELETE REQUEST working, username: ' + username);
  // res.status(204).send();
}

module.exports = {
  create_user,
  modify_user,
  delete_user
}