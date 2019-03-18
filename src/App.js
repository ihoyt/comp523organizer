import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProposalDetails from './components/proposal/ProposalDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProposal from './components/proposal/CreateProposal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/proposal/:id' component={ProposalDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProposal} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
