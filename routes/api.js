const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const bookmarks_controller = require('../controllers/bookmarksController');

/** ADD USER MODEL */

/** USER ROUTES */
router.post('/user', user_controller.create_user);
router.put('/user/:username', user_controller.modify_user);
router.delete('/user/:username', user_controller.delete_user);

/** BOOKMARKS ROUTES */
router.get('/bookmarks', bookmarks_controller.get_bookmarks);
router.post('/bookmarks/:id', bookmarks_controller.insert_bookmarks);
router.delete('/bookmarks/:id', bookmarks_controller.delete_bookmarks);

module.exports = router;