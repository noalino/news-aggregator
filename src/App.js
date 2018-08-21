import React, { Component } from 'react';
import style from './styles/App.scss';
import Nav from './components/Nav';
import Topics from './components/Topics';
import ArticlesList from './components/ArticlesList';
import Sidebar from './components/Sidebar';
import API_KEY from './secrets';
import jsonResponse from './data';

class App extends Component {
  constructor(props) {
    super(props);

    /** Save state to countries, sub categories, sources */
    this.state = {
      // articles: []
      articles: jsonResponse.articles
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
    // this.fetchData();
  }

  render() {
    const { articles } = this.state;
    return (
      <div className={style.app}>
        <Nav />
        <div className={style.homepage}>
          <h1 className={style.title}>Top Stories</h1>
          <p className={style.date}>Monday, August 20, 2018</p>
          <Topics />
          <ArticlesList articles={articles}/>
          <Sidebar />
        </div>
        <footer className={style.footer}>Powered by <a href="https://newsapi.org/" target="_blank">News API</a></footer>
      </div>
    );
  }
}

export default App;
