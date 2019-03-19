import React, { Component } from 'react';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {

  getProposalsByCategory = (category) => {
    const { proposals } = this.props;
    if (proposals) {
      let pros = proposals.filter(proposal => {
        return proposal.category === category;
      });
      return pros;
    }
  }

  render() {
    return(
      <div className="dashboard">
        <h3 className="roboto-font center dashboard-header">New</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(0)} />
        </div>
        <h3 className="roboto-font center dashboard-header">Accepted</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(1)} />
        </div>
        <h3 className="roboto-font center dashboard-header">Maybe</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(2)} />
        </div>
        <h3 className="roboto-font center dashboard-header">Rejected</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(3)} />
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
