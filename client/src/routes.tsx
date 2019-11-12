import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Companies from 'views/companies';
import Contacts from 'views/contacts';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Companies} />
          <Route exact path="/contacts/:name" component={Contacts} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
