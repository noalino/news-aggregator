import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticate, fetchBookmarks } from './actions/userActions';


import PrivateRoute from './PrivateRoute';

import Navbar from './components/navbar/Navbar';
import Index from './components/layout/Index';
import Login from './components/layout/Login';
import Search from './components/layout/Search'; // eslint-disable-line import/no-named-as-default
import Bookmarks from './components/layout/Bookmarks';

import './assets/images/favicon.ico';
import styles from './styles/App.scss';

class App extends Component {
  componentDidMount() {
    console.log('App mounting...');
    /* Verify user from token in cookie */
    this.props.authenticate(); // eslint-disable-line react/destructuring-assignment
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticate, fetchBookmarks } = this.props; // eslint-disable-line no-shadow
    if (isAuthenticate && isAuthenticate !== prevProps.isAuthenticate) {
      fetchBookmarks();
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/general" />} />
            <Route path="/login" render={props => <Login {...props} logAction="login" />} />
            <Route path="/signup" render={props => <Login {...props} logAction="signup" />} />
            <Route path="/search" component={Search} />
            <PrivateRoute path="/bookmarks" component={Bookmarks} />
            <Route path="/:topic" component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthenticate: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps, { authenticate, fetchBookmarks })(App);
