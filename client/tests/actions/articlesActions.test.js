import configureMockStore from 'redux-mock-store';
import { FETCH_ARTICLES, SEARCH_ARTICLES } from '../../src/actions/types';
import { searchArticles } from '../../src/actions/articlesActions';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

describe('search articles action', () => {
  let store;

  /* Before any assertion, the request needs to be resolved,
    therefore we flush all of the pending promises */
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  // Initialize mock store & stubbed http client
  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('searches for articles', async () => {
    // when
    await searchArticles({ query: 'bitcoin' })(store.dispatch);
    // await flushAllPromises();
    // then
    expect(store.getActions()).toEqual(
      [
        {
          type: SEARCH_ARTICLES,
          payload: {
            lastQuery: 'bitcoin',
            articles: [],
          },
        },
      ],
    );
  });
});
