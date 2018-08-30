import React, { Component } from 'react';
import favicon from './assets/images/favicon.ico';
import style from './styles/App.scss';
import Nav from './components/Nav';
import Header from './components/Header';
import Topics from './components/Topics';
import Bookmarks from './components/Bookmarks';
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
      articles: jsonResponse.business.articles,
      // bookmarks: []
      isSidebarOpen: false
    }

    // this.handleDrop = this.handleDrop.bind(this);
    this.handleClickTopic = this.handleClickTopic.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
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

  toggleSidebar(e) {
    e.preventDefault();
    
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }))
  }
  
  componentDidMount() {
    // this.fetchData();
  }

  render() {
    const { articles, isSidebarOpen, bookmarks } = this.state;
    return (
      <div className={style.app}>
        <Nav toggleSidebar={this.toggleSidebar}/>
        <Header />
        <div className={isSidebarOpen ? style.sidebarOpen : style.sidebar}>
          <div className={style.sidebar__list}>
            <Topics onClick={this.handleClickTopic}/>
            <Bookmarks />
            {/*<Bookmarks bookmarks={bookmarks} onDrop={this.handleDrop}/>*/}
          </div>
          <div className={style.sidebar__clickCatcher} onClick={this.toggleSidebar}></div>
        </div>
        <div className={style.scrollpage}>
          <ArticlesList articles={articles}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
