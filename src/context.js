import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_TOPIC':
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    category: 'general',
    articles: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    const country = window.navigator.language.split('-')[1];

    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${this.state.category}&apiKey=${process.env.API_KEY}`)
      .then(res => {console.log(res.data); this.setState({ articles: res.data.articles })})
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