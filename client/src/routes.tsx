import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'views/home';
import Companies from 'views/companies';
import Contacts from 'views/contacts';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/companies/" component={Companies} />
        <Route exact path="/contacts/" component={Contacts} />
      </Router>
    );
  }
}

export default Routes;
