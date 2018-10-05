import articlesReducer from './articlesReducer';
import { SEARCH_ARTICLES } from '../actions/types';

describe('articles reducer', () => {

  it('returns initial state', () => {
    expect(articlesReducer(undefined, {})).toEqual(
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
    const afterState = articlesReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      lastQuery: 'bitcoin',
      articles: ['test']
    });
  });
});