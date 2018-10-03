const express = require('express');
const router = express.Router();

const bookmarks_controller = require('../controllers/bookmarks.controller');

/** BOOKMARKS ROUTES */
router.get('/bookmarks', bookmarks_controller.get_bookmarks);
router.post('/bookmarks', bookmarks_controller.insert_bookmark);
router.put('/bookmarks', bookmarks_controller.remove_bookmark);

module.exports = router;