const User = require('../models/user');

/** ASYNC FUNCTIONS? */

// const create_user = (req, res) => {
//   const { username, password } = req.body;
//   // console.log('username: ', username);
//   // console.log('password: ', password);
//   User.findOne({ username }, (err, user) => {
//     if (err) console.log(err);
//     if (user) {
//       res.send(`Username ${username} is already taken.`);
//     } else {
//       const newUser = new User({ username, password });
//       newUser.save();
//       res.status(201).send('New user created');
//     }
//   });
// }

async function create_user(req, res, next) {
  const { username, password } = req.body;

  if (await User.findOne({ username })) {
    // console.log('user taken');
    // res.send(`Username ${username} is already taken.`);
    // throw `Username ${username} is already taken.`;
    return next();
    // return next(new Error(`Username ${username} is already taken.`)); // Arguments inside of next() are treated like errors (add error handler middleware after routes)
  }

  const user = new User({ username, password });
  await user.save();
  res.status(201).send('New user created');
}

const modify_user = (req, res) => { // Change password
  const { username, password } = req.body;
  res.status(200).send('PUT REQUEST working, username: ' + username);
}

const delete_user = (req, res) => {
  const { username, password } = req.body;
  res.status(200).send('DELETE REQUEST working, username: ' + username);
  // res.status(204).send();
}

module.exports = {
  create_user,
  modify_user,
  delete_user
}