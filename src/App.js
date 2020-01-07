import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import Movies from './components/movies';
import NavBar from './components/common/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';

class App extends Component {
  state = {}

  componentDidMount(){
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() { 
    return (
      <React.Fragment>
      <NavBar user={this.state.user}/>
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/customers" component={Customers} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      </React.Fragment>
      );
  }
}
 
export default App;