import React, { Component } from 'react';
import Notifications from './Notifications';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
  render() {
    const { proposals } = this.props;
    //console.log(this.props);
    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProposalList proposals={proposals} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
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
