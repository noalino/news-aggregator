import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './assets/images/favicon.ico';
import styles from './styles/App.scss';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Log from './components/layout/Log';
import Search from './components/layout/Search';
import Favorites from './components/layout/Favorites';
import Bookmarks from './components/layout/Bookmarks';

class App extends Component {  
  render() {
    // const Homepage = ({ component: Component, path, ...props }) => (
    //   <Route exact path={path} render={() => (
    //     <Component {...props} />
    //   )}/>
    // );

    return (
      <Router>
        <div className={styles.app}>
          <Navbar />

          <Switch>
            {/*<Homepage
              exact path="/"
              component={Index}
              articles={articles}
              isSidebarOpen={isSidebarOpen}
              handleClickTopic={this.handleClickTopic}
              toggleSidebar={this.toggleSidebar}
            />*/}
            <Route exact path="/" component={Index} />
            {/*<Route exact path="/:category" component={Index} />*/}
            <Route exact path="/log" component={Log} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/bookmarks" component={Bookmarks} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
