import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Log from './components/layout/Log';
import Search from './components/layout/Search';
import Favorites from './components/layout/Favorites';
import Bookmarks from './components/layout/Bookmarks';

import './assets/images/favicon.ico';
import styles from './styles/App.scss';

import { store, history } from './store';

const App = () => {  
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <div className={styles.app}>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/log" component={Log} />
                <Route path="/search" component={Search} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/bookmarks" component={Bookmarks} />
                <Route path="/:topic" component={Index} />
              </Switch>
            </div>
          </Router>
        </ConnectedRouter>
      </Provider>
    );
}

export default App;
