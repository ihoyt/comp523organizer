import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const GetEmailTemplate = (props) => {
    const { category } = props;


}

const mapStateToProps = (state) => {
  return {
      proposals: state.firestore.ordered.proposals,
      emails: state.firestore.ordered.emails
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'emails' }
  ])
)(GetEmails);
