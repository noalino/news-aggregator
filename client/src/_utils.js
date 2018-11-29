import moment from 'moment';
import topicsList from './_topics';

export const isValidTopic = topic => (
  topicsList.find(({ name }) => name === topic) || false
);

// FETCH ARTICLES EVERY MINUTE (LIMIT 1,000 REQUESTS/DAY API)
export const apiCallFrequency = 60000;

// ONE MONTH AGO (FROM NEWSAPI DEV REQUIREMENTS)
export const minSearchDate = moment().subtract(1, 'months');

export const dateFormat = 'YYYY/MM/DD';

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/*----------------------------
  SEARCH URL TRANSFORMATIONS
----------------------------*/
/*
  Transform url string | '?q=test&sortBy=date' |
  to object            | { query: test, sortBy: date } |
*/
export const getParams = url => (
  url ? (
    Object.assign(...url.slice(1).split('&')
      .map(param => param.split('='))
      .map(([keyURL, valueURL]) => {
        const key = keyURL === 'q' ? 'query' : keyURL;
        const value = valueURL ? decodeURIComponent(valueURL) : '';

        if (key === 'from' || key === 'to') {
          return ({
            [key]: value && moment(value, 'YYYY-MM-DD').isValid() ? moment(value) : null,
          });
        }
        return { [key]: value };
      }))
  ) : {}
);

/*
  Transform object | { query: test, sortBy: date } |
  to url string    | '?q=test&sortBy=date' |
*/
export const setSearchParams = params => (
  Object.entries(params)
    .map(([key, value]) => {
      let paramURL;
      if (value) {
        if (key === 'from' || key === 'to') {
          paramURL = value.format('YYYY-MM-DD');
        } else {
          paramURL = value.trim();
        }
      }
      return (
        paramURL ? (
          `${key === 'query' ? 'q' : key}=${encodeURIComponent(paramURL.trim())}`
        ) : ''
      );
    })
    .filter(param => param !== '')
    .join('&')
);

/*---------------------
   ARTICLES ACTIONS
---------------------*/

/* API URL SET UP */
export const setSearchURL = ({
  query,
  options,
  language,
  loadPage = 1,
  pageSize,
}) => {
  const queryURI = encodeURIComponent(query);
  const { from, to, source, sortBy } = options;
  const sorting = sortBy === 'date' ? 'publishedAt' : sortBy;
  return (
    `https://newsapi.org/v2/everything?q=${queryURI}&from=${from}&to=${to}&language=${language}&sources=${source}&sortBy=${sorting}&pageSize=${pageSize}&page=${loadPage}&apiKey=${process.env.API_KEY}`
  );
};

/* ARTICLES MODIFICATIONS */

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
    if (articles.findIndex(({ id }) => id === article.id) === -1) {
      return { ...article, newest: true };
    }
    return { ...article, newest: false };
  });
}

export const fetchAction = async ({ articles, newArticles }) => {
  const withId = await generateId(newArticles);
  const filtered = await filterArticles(withId);
  return addNewestParam(filtered, articles);
};

export const searchAction = async (articles) => {
  const withId = await generateId(articles);
  const filtered = await filterArticles(withId);
  return filtered.map(article => ({ ...article, newest: true }));
};

export const loadNextAction = async ({ articles, newArticles }) => {
  const withId = await generateId(newArticles);
  const addNewest = async (prevArticles, nextArticles) => {
    const prev = prevArticles.map(article => ({ ...article, newest: false }));
    const next = nextArticles.map(article => ({ ...article, newest: true }));
    return prev.concat(next);
  };
  const articlesWithNewest = await addNewest(articles, withId);
  return filterArticles(articlesWithNewest);
};
