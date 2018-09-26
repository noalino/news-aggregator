import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Log from './components/layout/Log';
import Search from './components/layout/Search';
import Bookmarks from './components/layout/Bookmarks';

import './assets/images/favicon.ico';
import styles from './styles/App.scss';

import store from './store';

const App = () => {  
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.app}>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" component={Index} /> */}
            <Route exact path="/" render={() => <Redirect to="/general"></Redirect>} />
            <Route path="/log" component={Log} />
            <Route path="/search" component={Search} />
            <Route path="/bookmarks" component={Bookmarks} />
            <Route path="/:topic" component={Index} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
