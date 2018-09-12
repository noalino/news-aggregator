import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCategory } from '../../actions/newsActions';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList, changeCategory }) => {
  return (
    <div className={styles.topics}>
      <h2>Topics</h2>
      <ul>
        {topicsList.map(topic => (
          <li key={topic}>
            <button onClick={() => changeCategory(topic)}>
              <span className="fas fa-briefcase"></span>{topic}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Topics.defaultProps = {
  topicsList: [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ]
}

Topics.propTypes = {
  topicsList: PropTypes.array.isRequired,
  changeCategory: PropTypes.func.isRequired
}

export default connect(null, { changeCategory })(Topics);