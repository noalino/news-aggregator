import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList, match: { params }, sidebar }) => (
  <div className={styles.topics} sidebar={`${sidebar}`}>
    <h2>Topics</h2>
    <ul>
      {topicsList.map(topic => (
        <li key={topic.name}>
          <Link to={topic.name} className={styles.topic} active={`${params.topic === topic.name}`}>
            <i className={topic.icon} style={{ color: topic.color }} />
            <h4>{topic.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Topics.defaultProps = {
  sidebar: false,
  topicsList: [
    {
      name: 'business',
      icon: 'fas fa-briefcase',
      color: '#3d3d5c',
    },
    {
      name: 'entertainment',
      icon: 'fas fa-gamepad',
      color: '#fc0',
    },
    {
      name: 'general',
      icon: 'fas fa-globe',
      color: '#8c8c8c',
    },
    {
      name: 'health',
      icon: 'fas fa-plus-square',
      color: '#e63900',
    },
    {
      name: 'science',
      icon: 'fas fa-flask',
      color: '#8600b3',
    },
    {
      name: 'sports',
      icon: 'fas fa-football-ball',
      color: '#b35900',
    },
    {
      name: 'technology',
      icon: 'fas fa-mobile-alt',
      color: '#3cc',
    },
  ],
};

Topics.propTypes = {
  topicsList: PropTypes.instanceOf(Array),
  match: PropTypes.instanceOf(Object).isRequired,
  sidebar: PropTypes.bool,
};

export default withRouter(Topics);
