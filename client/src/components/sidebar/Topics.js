import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList }) => {
  return (
    <div className={styles.topics}>
      <h2>Topics</h2>
      <ul>
        {topicsList.map(topic => (
          <li key={topic}>
            <Link to={topic}>
              <span className="fas fa-briefcase"></span>{topic}
            </Link>
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
}

export default Topics;