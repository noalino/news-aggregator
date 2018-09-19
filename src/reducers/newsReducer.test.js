import newsReducer from './newsReducer';
import { SEARCH_ARTICLES } from '../actions/types';

describe('news reducer', () => {

  it('returns initial state', () => {
    expect(newsReducer(undefined, {})).toEqual(
      {
        country: {
          code: 'us',
          name: 'United States',
          language: {
            code: 'en',
            name: 'English'
          }
        },
        lastQuery: '',
        sources: [],
        articles: []
      }
    );
  });

  it('updates lastQuery & articles by searching articles', () => {
    // given
    const beforeState = {
      lastQuery: '',
      articles: []
    };
    const action = {type: SEARCH_ARTICLES, payload: { lastQuery: 'bitcoin', articles: ['test']}};
    // when
    const afterState = newsReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      lastQuery: 'bitcoin',
      articles: ['test']
    });
  });
});