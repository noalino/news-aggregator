const findQuery = str => str.match(/[^?q=]/gi).reduce((a, b) => a + b);
export const getQuery = url => (
  url ? decodeURIComponent(findQuery(url)) : ''
);

/** UPDATE TO COMPARE ALL OBJECTS */
export const isEqual = (obj1, obj2) => { // Works with objects of same length & same key order only
  if (obj2 === undefined) {
    return false;
  }

  const arr1 = Object.values(obj1);
  const arr2 = Object.values(obj2);
  const { length } = arr1;

  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

// Add id to each article
export const generateArticleId = articles => (
  articles.forEach((article) => {
    const { publishedAt, source, title } = article;
    article.id = `${publishedAt}_${source.id}_${title}`; // eslint-disable-line no-param-reassign
  })
);

// Remove duplicates
export const filterArticles = articles => (
  articles.filter((article, index, self) => (
    index === self.findIndex(item => item.id === article.id)
  ))
);
