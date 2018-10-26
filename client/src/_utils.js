/* Transform url string | '?q=test&sortBy=date' |
  to object             | { query: test, sortBy: date } | */
export const getParams = url => (
  url ? (
    Object.assign(...url.slice(1).split('&')
      .map(param => param.split('='))
      .map(([key, value]) => (
        { [key === 'q' ? 'query' : key]: value }
      )))
  ) : {}
);

/* Transform object | { query: test, sortBy: date } |
   to url string    | '?q=test&sortBy=date' | */
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
export const generateId = articles => (
  articles.map((article) => {
    const { publishedAt, source, title } = article;
    return {
      ...article,
      id: `${publishedAt}_${source.id}_${title}`,
    };
  })
);

// Remove duplicates
export const filterArticles = articles => (
  articles.filter((article, index, self) => (
    index === self.findIndex(item => item.id === article.id)
  ))
);
