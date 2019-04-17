import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProposalDetails from './components/proposal/ProposalDetails';
import SignIn from './components/auth/SignIn';
import CreateProposal from './components/proposal/CreateProposal';
import EmailTemplater from './components/email/EmailTemplater';
import EmailSender from './components/email/EmailSender';

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
            <Route path='/create' component={CreateProposal} />
            <Route path='/sendmail' component={EmailSender} />
            <Route path='/templates' component={EmailTemplater} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
