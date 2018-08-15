import React, { Component } from 'react';
// import style from './App.css';
import ArticlesList from './components/ArticlesList';
import API_KEY from './secrets';

class App extends Component {
  constructor(props) {
    super(props);

    /** Save state to countries, sub categories, sources */
    this.state = {
      articles: []
    }
  }

  fetchData() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ articles: data.articles }))
      .catch(error => console.warn(error))
  }
  
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { articles } = this.state;
    return (
      <ArticlesList articles={articles}/>
    )
  }
}

export default App;
