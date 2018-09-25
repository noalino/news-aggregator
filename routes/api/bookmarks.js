const express = require('express');
const router = express.Router();

/** ADD USER MODEL */

// retrieve all bookmarked articles
router.get('/', (req, res) => {
  // const articles = db.map(article => ({
  //   // id: article.id,
  //   // title: article.title,
  //   // description: article.description,
  //   // source: article.source
  //   ...article
  // }));
  // res.send(articles);

  res.send('GET REQUEST working');
});

// insert new bookmark
router.post('/', (req, res) => {
  // db.push({ ...req.body
  // });
  // res.status(200).send();

  res.status(200).send('POST REQUEST working');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

});

module.exports = router;