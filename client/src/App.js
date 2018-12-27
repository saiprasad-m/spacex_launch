import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider } from 'react-apollo';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Launches from './components/Launches'
import Launch from './components/Launch'
import './App.css';
import logo from './spacex.png'

const client = new ApolloClient({
  uri: '/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
      <div className="container">
       <img src={logo} alt="SpaceX" style={{ width: 180, height: 100, display: 'block', margin: 'auto'}}/>
       <Route exact path="/" render={() => <Redirect to="/launches/1" />} />
       <Route exact path="/launch/:flight_number" component={Launch} />
       <Route exact path="/launches/:page" component={Launches} />
      </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
