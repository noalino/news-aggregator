import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import favicon from './assets/images/favicon.ico';
import styles from './styles/App.scss';
import Home from './components/Home';
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
    const Homepage = ({ component: Component, path, ...props }) => (
      <Route exact path={path} render={() => (
        <Component {...props} />
      )}/>
    );

    return (
      <div className={styles.app}>
        <nav className={styles.nav}>
          <div className={styles.menu} onClick={this.toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Link to="/">News</Link>
          <div className={styles.links}>
            <Link to="/log"><i className="fas fa-edit"></i><p>Sign up</p></Link>
            <Link to="/log"><i className="fas fa-sign-in-alt"></i><p>Log in</p></Link>
            {/*<i className="fas fa-sign-out-alt"></i><p>Log Out</p>*/}
            <form>
              <input type="text" placeholder="Search articles..."/>
              <Link to="/search"><button><i className="fas fa-search"></i></button></Link>
            </form>
          </div>
        </nav>

        <Homepage
          path="/"
          component={Home}
          articles={articles}
          isSidebarOpen={isSidebarOpen}
          handleClickTopic={this.handleClickTopic}
          toggleSidebar={this.toggleSidebar}
        />
        {/*<Route path="/log" component={Log} />
        <Route path="/search" component={Search} />*/}
      </div>
    );
  }
}

export default App;
