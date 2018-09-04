import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from '../../context';
import axios from 'axios';
import styles from '../../styles/sidebar/Topics.scss';


class Topics extends Component {
  constructor(props) {
    super(props)
  }

  changeTopic = (country, dispatch, e) => {
    e.preventDefault();

    const { match, history } = this.props;
    const newCategory = e.target.textContent;
    const { category } = match.params;

    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${newCategory}&apiKey=${process.env.API_KEY}`)
      .then(res => {
        dispatch({
          type: 'CHANGE_TOPIC',
          payload: {
            category: newCategory,
            articles: res.data.articles
          }
        });

        if (newCategory != category ) {
          history.push(newCategory);
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const topics = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology'
    ];

    return (
      <Consumer>
        {({country, dispatch}) => {

          return (
            <div className={styles.topics}>
              <h2>Topics</h2>
              <ul>
                {topics.map(topic => (
                  <li key={topic}>
                    <button onClick={this.changeTopic.bind(this, country, dispatch)}>
                      <span className="fas fa-briefcase"></span>{topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Topics = withRouter(Topics);