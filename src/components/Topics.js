import React from 'react';
import styles from '../styles/Topics.scss';

const Topics = ({ onClick }) => {
  const topics = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
    'all'
  ];

  const list = topics.map(topic => (
    <li key={topic}>
      <button type="button" onClick={() => onClick(topic)}><span className="fas fa-briefcase"></span> {topic}</button>
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