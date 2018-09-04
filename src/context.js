import React, { Component } from 'react';
import axios from 'axios';
import jsonResponse from './data';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_TOPIC':
      return {
        ...state,
        category: action.payload.category,
        articles: action.payload.articles
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    country: window.navigator.language.split('-')[1],
    category: 'general',
    articles: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    const { country, category } = this.state;

    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}`)
      .then(res => { console.log(res.data); this.setState({ articles: res.data.articles })})
      .catch(err => console.warn(err))

    // this.setState({ articles: jsonResponse.business.articles })
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;