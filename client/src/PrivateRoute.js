import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticate, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticate ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )}
  />
);

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps)(PrivateRoute);
