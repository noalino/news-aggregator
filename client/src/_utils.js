import moment from 'moment';
import topicsList from './_topics';

const { API_KEY } = process.env;

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
     URL TRANSFORMATIONS
----------------------------*/
export const extractParams = ({ page = 1, ...args }) => {
  const {
    query,
    options,
    language,
    pageSize,
  } = args;
  const { from, to, source, sortBy } = options;
  const sorting = sortBy === 'date' ? 'publishedAt' : sortBy;

  return {
    q: query,
    from,
    to,
    sources: source,
    sortBy: sorting,
    language,
    pageSize,
    page,
    apiKey: API_KEY,
  };
};

/*
  Transform url string | '?q=test&sortBy=date' |
  to object            | { q: test, sortBy: date } |
*/
export const getParams = url => (
  url ? (
    Object.assign(...url.slice(1).split('&')
      .map(param => param.split('='))
      .map(([key, valueURL]) => {
        // const key = keyURL === 'q' ? 'query' : keyURL;
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
  Transform object | { q: test, sortBy: date } |
  to url string    | 'q=test&sortBy=date' |
*/
export const setParams = params => (
  Object.entries(params)
    .map(([key, value]) => {
      let paramURL = value;
      if (value) {
        if (value instanceof moment) {
          paramURL = value.format('YYYY-MM-DD');
        } else if (typeof value === 'string') {
          paramURL = value.trim();
        }
      }
      return paramURL ? `${key}=${encodeURIComponent(paramURL)}` : '';
    })
    .filter(param => param !== '')
    .join('&')
);

/*---------------------
   ARTICLES ACTIONS
---------------------*/

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
