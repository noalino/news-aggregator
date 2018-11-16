/*
  Transform url string | '?q=test&sortBy=date' |
  to object            | { query: test, sortBy: date } |
*/
export const getParams = url => (
  url ? (
    Object.assign(...url.slice(1).split('&')
      .map(param => param.split('='))
      .map(([key, value]) => (
        { [key === 'q' ? 'query' : key]: decodeURIComponent(value) }
      )))
  ) : {}
);

/*
  Transform object | { query: test, sortBy: date } |
  to url string    | '?q=test&sortBy=date' |
*/
export const setSearchParams = params => (
  Object.entries(params)
    .map(param => (
      param[1] ? (
        `${param[0] === 'query' ? 'q' : param[0]}=${encodeURIComponent(param[1])}`
      ) : ''
    ))
    .filter(param => param !== '')
    .join('&')
);

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Add id to each article
async function generateId(articles) {
  return articles.map((article) => {
    const { publishedAt, source, title } = article;
    return {
      ...article,
      id: `${publishedAt}_${source.id}_${title}`,
    };
  });
}

// Remove duplicates
async function filterArticles(articles) {
  return articles.filter((article, index, self) => (
    index === self.findIndex(({ id }) => id === article.id)
  ));
}

async function addNewestParam(newArticles, articles) {
  return newArticles.map((article) => {
    // if oldArticles.length > 0 &&
    if (articles.findIndex(({ id }) => id === article.id) === -1) {
      return { ...article, newest: true };
    }
    return { ...article, newest: false };
  });
}

export const fetchUtils = async ({ articles, newArticles }) => {
  const withId = await generateId(newArticles);
  const filtered = await filterArticles(withId);
  return addNewestParam(filtered, articles);
};

export const searchUtils = async (articles) => {
  const withId = await generateId(articles);
  const filtered = await filterArticles(withId);
  return filtered.map(article => ({ ...article, newest: true }));
};

export const loadNextUtils = async ({ articles, newArticles }) => {
  const withId = await generateId(newArticles);
  const addNewest = async (prevArt, nextArt) => {
    const prev = prevArt.map(article => ({ ...article, newest: false }));
    const next = nextArt.map(article => ({ ...article, newest: true }));
    return prev.concat(next);
  };
  const articlesWithNewest = await addNewest(articles, withId);
  return filterArticles(articlesWithNewest);
};
