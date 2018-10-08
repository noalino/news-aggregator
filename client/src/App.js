import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { authenticate } from './actions/userActions';

import PrivateRoute from './PrivateRoute';

import Navbar from './components/navbar/Navbar';
import Index from './components/layout/Index';
import Login from './components/layout/Login';
import Search from './components/layout/Search';
import Bookmarks from './components/layout/Bookmarks';

import './assets/images/favicon.ico';
import styles from './styles/App.scss';

// import store from './store';

class App extends Component {
  componentDidMount() {
    console.log('App mounting...');
    this.props.authenticate();
  }

  render() {
    return (
      // <Provider store={store}>
        <Router>
          <div className={styles.app}>
            <Navbar />
            <Switch>
              {/* <Route exact path="/" component={Index} /> */}
              <Route exact path="/" render={() => <Redirect to="/general"></Redirect>} />
              <Route path="/login" render={props => <Login {...props} log="login" />} />
              <Route path="/signup" render={props => <Login {...props} log="signup" />} />
              <Route path="/search" component={Search} />
              <PrivateRoute path="/bookmarks" component={Bookmarks} />
              <Route path="/:topic" component={Index} />
            </Switch>
          </div>
        </Router>
      // </Provider>
    );
  }
};

export default connect(null, { authenticate })(App);

// const App = () => {  
//   return (
//     <Provider store={store}>
//       <Router>
//         <div className={styles.app}>
//           <Navbar />
//           <Switch>
//             {/* <Route exact path="/" component={Index} /> */}
//             <Route exact path="/" render={() => <Redirect to="/general"></Redirect>} />
//             <Route path="/login" render={props => <Login {...props} log="login" />} />
//             <Route path="/signup" render={props => <Login {...props} log="signup" />} />
//             <Route path="/search" component={Search} />
//             <PrivateRoute path="/bookmarks" component={Bookmarks} />
//             <Route path="/:topic" component={Index} />
//           </Switch>
//         </div>
//       </Router>
//     </Provider>
//   );
// }

// export default App;
