import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import axios from 'axios';
import { fetchBookmarks } from '../../actions/newsActions';
import { generateArticleId } from '../../_utils';

import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    const secret_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViYWZhNzYzMGZiYmVhMmYyYTVkNmI3NCIsInVzZXJuYW1lIjoiYmVub2l0In0sImlhdCI6MTUzODM5NjM1NX0.IwfrJCcaTYBQ0iVbiC0dyDiV3mTYf6IN_ldJIOFFbgg';
    axios.get(`http://localhost:5000/api/user/bookmarks`, {
      headers: { 'Authorization': `Bearer ${secret_token}` }
    }).then(({ data }) => {
      // console.log('data: ', data);
      this.setState({ bookmarks: data });
    }).catch(err => console.log(err));
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.articles !== this.props.articles;
  }

  render() {
    console.log('articles list rendering');
    console.log('bookmarks state: ', this.state.bookmarks);
    const { lastQuery, articles } = this.props;
    const renderArticle = article => {
      // const id = shortid.generate();
      const id = generateArticleId(article);
      return (
        <ArticleBox key={id} article={{...article, id}} />
      );
    };
    return (
      <div className={styles.scrollpage}>
      {
        (lastQuery !== '' && articles.length < 1) ? 

          <h3>No Results Found</h3> :

          <Fragment>
            <div className={styles.container}>
              {/* Remove duplicates if any */}
              {articles
                .filter((article, i, self) => {
                  // if (arr[i + 1]) {
                  //   return generateArticleId(article) !== generateArticleId(arr[i + 1]);
                  // }
                  i === self.indexOf(article);
                })
                .map(renderArticle)}
            </div>
            
            {articles.length > 0 && 
              <footer className={styles.footer}>
                Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
              </footer>
            }
          </Fragment>
      }
      </div>
    );
  }
}

ArticlesList.propTypes = {
  lastQuery: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  articles: state.news.articles
});

export default connect(mapStateToProps, { fetchBookmarks })(ArticlesList);