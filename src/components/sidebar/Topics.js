import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = () => {
  const topics = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
    'general'
  ];

  const list = topics.map(topic => (
    <li key={topic}>
      <Link to={topic}>
        <button type="button"><span className="fas fa-briefcase"></span> {topic === 'general' ? 'all' : topic}</button>
      </Link>
    </li>
  ));

  return (
    <div className={styles.topics}>
      <h2>Topics</h2>
      <ul>
        {list}
      </ul>
    </div>
  );
}

export default Topics;