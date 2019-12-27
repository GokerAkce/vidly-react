import React, { Component } from 'react';
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import {Route, Redirect, Switch} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals}></Route>
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