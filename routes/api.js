const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');
const bookmarks_controller = require('../controllers/bookmarks.controller');

/** USER ROUTES */
router.post('/user', user_controller.create_user);
router.put('/user/:username', user_controller.modify_user);
router.delete('/user/:username', user_controller.delete_user);

/** BOOKMARKS ROUTES */
router.get('/bookmarks', bookmarks_controller.get_bookmarks);
router.post('/bookmarks', bookmarks_controller.insert_bookmark);
router.put('/bookmarks/:id', bookmarks_controller.remove_bookmark);

module.exports = router;