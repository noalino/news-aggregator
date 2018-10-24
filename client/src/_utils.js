const findQuery = str => str.match(/[^?q=]/gi).reduce((a, b) => a + b);
export const getQuery = url => (
  url ? decodeURIComponent(findQuery(url)) : ''
);

/** UPDATE TO COMPARE ALL OBJECTS */
// Works with objects of same length & same key order only
export const isObjectsEqual = (obj1, obj2) => {
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

// export const isArraysEqual = (a, b) => {
//   if (a === b) return true;
//   if (a == null || b == null) return false;
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// };

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Add id to each article
export const generateId = articles => (
  articles.forEach((article) => {
    const { publishedAt, source, title } = article;
    // eslint-disable-next-line no-param-reassign
    article.id = `${publishedAt}_${source.id}_${title}`;
  })
);

// Remove duplicates
export const filterArticles = articles => (
  articles.filter((article, index, self) => (
    index === self.findIndex(item => item.id === article.id)
  ))
);
