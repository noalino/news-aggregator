import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList }) => (
  <div className={styles.topics}>
    <h2>Topics</h2>
    <ul>
      {topicsList.map(topic => (
        <li key={topic.name}>
          <Link to={topic.name}>
            <i className={topic.icon} />
            {` ${topic.name}`}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Topics.defaultProps = {
  topicsList: [
    {
      name: 'business',
      icon: 'fas fa-briefcase',
    },
    {
      name: 'entertainment',
      icon: 'fas fa-gamepad',
    },
    {
      name: 'general',
      icon: 'fas fa-globe',
    },
    {
      name: 'health',
      icon: 'fas fa-plus-square',
    },
    {
      name: 'science',
      icon: 'fas fa-flask',
    },
    {
      name: 'sports',
      icon: 'fas fa-football-ball',
    },
    {
      name: 'technology',
      icon: 'fas fa-mobile-alt',
    },
  ],
};

Topics.propTypes = {
  topicsList: PropTypes.instanceOf(Array),
};

export default Topics;
