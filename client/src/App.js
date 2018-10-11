import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticate, fetchBookmarks } from './actions/userActions';

import PrivateRoute from './PrivateRoute';

import Navbar from './components/navbar/Navbar';
import Index from './components/layout/Index';
import Login from './components/layout/Login';
import Search from './components/layout/Search';
import Bookmarks from './components/layout/Bookmarks';

import './assets/images/favicon.ico';
import styles from './styles/App.scss';

class App extends Component {
  componentDidMount() {
    console.log('App mounting...');
    // Verify user from token in cookie
    this.props.authenticate();
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, fetchBookmarks } = this.props;
    if (isAuthenticated && isAuthenticated !== prevProps.isAuthenticated) {
      fetchBookmarks();
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/general"></Redirect>} />
            <Route path="/login" render={props => <Login {...props} log="login" />} />
            <Route path="/signup" render={props => <Login {...props} log="signup" />} />
            <Route path="/search" component={Search} />
            <PrivateRoute path="/bookmarks" component={Bookmarks} />
            <Route path="/:topic" component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { authenticate, fetchBookmarks })(App);