import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList }) => (
  <div className={styles.topics}>
    <h2>Topics</h2>
    <ul>
      {topicsList.map(topic => (
        <li key={topic}>
          <Link to={topic}>
            <span className="fas fa-briefcase" />
            {topic}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Topics.defaultProps = {
  topicsList: [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ],
};

Topics.propTypes = {
  topicsList: PropTypes.instanceOf(Array),
};

export default Topics;
