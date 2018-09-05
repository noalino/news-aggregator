import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchArticles } from '../../actions/newsActions';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Topics.scss';


class Topics extends Component {

  changeTopic = e => {
    const category = e.target.textContent;
    this.props.fetchArticles(category);
  }

  render() {
    const topics = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology'
    ];

    return (
      <div className={styles.topics}>
        <h2>Topics</h2>
        <ul>
          {topics.map(topic => (
            <li key={topic}>
              <Link to={topic === 'general' ? '/' : topic}>
                <button onClick={this.changeTopic}>
                  <span className="fas fa-briefcase"></span>{topic}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Topics.propTypes = {
  fetchArticles: PropTypes.func.isRequired
}

export default connect(null, { fetchArticles })(Topics);
// export default withRouter(connect(null, { fetchArticles })(Topics));
// export default Topics = withRouter(Topics);