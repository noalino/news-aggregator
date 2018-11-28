/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import topicsList from '../../_topics';
import toggleSidebar from '../../actions/layoutActions';
import styles from '../../styles/sidebar/Topics.scss';

const Topics = ({ topicsList, match: { params }, sidebar, toggleSidebar }) => (
  <div className={styles.topics} sidebar={`${sidebar}`}>
    <h2>Topics</h2>
    <ul>
      {topicsList.map(topic => (
        <li key={topic.name}>
          <Link
            to={topic.name}
            onClick={() => toggleSidebar(false)}
            className={styles.topic}
            active={`${params.topic === topic.name}`}
          >
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
  topicsList,
};

Topics.propTypes = {
  topicsList: PropTypes.instanceOf(Array),
  match: PropTypes.instanceOf(Object).isRequired,
  sidebar: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { toggleSidebar })(Topics));
