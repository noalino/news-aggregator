import React from 'react';
import style from '../styles/Topics.scss';

const Topics = () => {
  const topics = [
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
    'Sports',
    'Technology'
  ];

  const list = topics.map(topic => (
    <li key={topic}>{topic}</li>
  ));

  return (
    <div className={style.topics}>
      <h2>Topics</h2>
      <ul>
        {list}
      </ul>
    </div>
  );
}

export default Topics;