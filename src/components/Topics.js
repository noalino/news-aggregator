import React from 'react'

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
    <ul>
      {list}
    </ul>
  )
}

export default Topics