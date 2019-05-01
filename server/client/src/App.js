import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProposalDetails from './components/proposal/ProposalDetails';
import SignIn from './components/auth/SignIn';
import CreateProposal from './components/proposal/CreateProposal';
import SubmitSuccess from './components/proposal/SubmitSuccess';
import EmailTemplater from './components/email/EmailTemplater';
import EmailSender from './components/email/EmailSender';

//Handles all of the URI requests, serving the associated component in the app div when the appropiate button is clicked
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" id="app">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/proposal/:id' component={ProposalDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/create' component={CreateProposal} />
            <Route path='/sendmail' component={EmailSender} />
            <Route path='/templates' component={EmailTemplater} />
            <Route path='/success' component={SubmitSuccess} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
