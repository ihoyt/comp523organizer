import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import EmailTemplate from './EmailTemplate';

class EmailTemplater extends Component {

  getEmailTemplate = (type) => {
    const { emails } = this.props;

    if (emails) {
      let email = emails.filter(email => {
        return email.type === type;
      });
      return email;
    }
  }

  render() {
    if (emails) {
      return(
        <div className="container email-templater">
          <h3 className="center">Email Templates</h3>
          <EmailTemplate email={this.getEmailTemplate('request') } type="request" />
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
