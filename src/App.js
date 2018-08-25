import React, { Component } from 'react';
import favicon from './assets/images/favicon.ico';
import style from './styles/App.scss';
import Nav from './components/Nav';
import Header from './components/Header';
import Topics from './components/Topics';
import Sidebar from './components/Sidebar';
import ArticlesList from './components/ArticlesList';
import Footer from './components/Footer';
import API_KEY from './secrets';
import jsonResponse from './data';

class App extends Component {
  constructor(props) {
    super(props);

    /** Save state to countries, sub categories, sources */
    this.state = {
      // articles: []
      articles: jsonResponse.business.articles
      // bookmarks: []
    }

    // this.handleDrop = this.handleDrop.bind(this);
    this.handleClickTopic = this.handleClickTopic.bind(this);
  }

  fetchData() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ articles: data.articles }))
      .catch(error => console.warn(error))
  }

  // handleDrop(el) {
  //   this.setState(prevState => {
  //     const newList = prevState.bookmarks.push(el);
  //     return { bookmarks: newList };
  //   });
  // }

  handleClickTopic(topic) { /** componentShouldUpdate in ArticlesList */
    this.setState({
      articles: jsonResponse[topic].articles
    })
  }
  
  componentDidMount() {
    // this.fetchData();
  }

  render() {
    const { articles, bookmarks } = this.state;
    return (
      <div className={style.app}>
        <Nav />
        <Header />
        <Topics onClick={this.handleClickTopic}/>
        <Sidebar />
        {/*<Sidebar bookmarks={bookmarks} onDrop={this.handleDrop}/>*/}
        <div className={style.scrollpage}>
          <ArticlesList articles={articles}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
