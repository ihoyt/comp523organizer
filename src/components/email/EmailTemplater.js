import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import EmailTemplate from './EmailTemplate';

// Uncomment this line once all templates are created in database
// in order to prevent templates randomly not rendering
// Also uncomment partial line in if statement below at beginning of render()
//const num_templates = 4;

class EmailTemplater extends Component {
  // Passed in emails as props

  // Iterates through passed in email templates to find the template that
  // matches the requested category
  getEmailTemplate = (type) => {
    const { emails } = this.props;
    if (emails) {
      let email = emails.filter(email => {
        return email.type === type;
      });
      if (typeof email[0] !== 'undefined') {
        return email[0];
      } else {
        let email = { subject: '', body: '', type: type };
        return email;
      }
    } else {
      return null;
    }
  }

  render() {
    const { emails } = this.props;

    if (emails /* && emails.length >= num_templates */) {
      return(
        <div className="container email-templater">
          <h3 className="center">Templates</h3>
          <h4>Email</h4>
          <EmailTemplate email={this.getEmailTemplate('accepted') } />
          <EmailTemplate email={this.getEmailTemplate('maybe') } />
          <EmailTemplate email={this.getEmailTemplate('rejected') } />
          <h4>Client Agreement</h4>
          <EmailTemplate email={this.getEmailTemplate('agreement') } />
        </div>
      )
    } else {
      return (
        <div className="container email-templater">
          <h3 className="center">Email Templates</h3>
          <p className="center">Loading email templates...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
      emails: state.firestore.ordered.emails
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'emails' }
  ])
)(EmailTemplater);
