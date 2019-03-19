import React, { Component } from 'react';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
  render() {
    const { proposals } = this.props;
    return(
      <div className="dashboard">
        <h3 className="roboto-font center">New</h3>
        <div className="container">
          <ProposalList proposals={proposals} category='0'/>
        </div>
        <h3 className="roboto-font center">Accepted</h3>
        <div className="container">
          <ProposalList proposals={proposals} category='1'/>
        </div>
        <h3 className="roboto-font center">Maybe</h3>
        <div className="container">
          <ProposalList proposals={proposals} category='2'/>
        </div>
        <h3 className="roboto-font center">Rejected</h3>
        <div className="container">
          <ProposalList proposals={proposals} category='3'/>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
      proposals: state.firestore.ordered.proposals
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'proposals' }
  ])
)(Dashboard);
