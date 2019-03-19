import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';

const  ProposalDetails = (props) => {
  const { proposal } = props;
  if (proposal) {
      return (
      <div className="container section proposal-details">
        <div className="card z-depth">
          <div className="card-content">
            <span className="card-title">{ proposal.title }</span>
            <p>{ proposal.summary }</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Submitted by { proposal.proposeeFname } { proposal.proposeeLname }</div>
            <div>{proposal.proposeeEmail}</div>
          </div>
        </div>
        <div className="row">
          <div className="col s2"><button className="btn-large blue waves-effect">Accept</button></div>
          <div className="col s2"><button className="btn-large waves-effect">Maybe</button></div>
          <div className="col s2"><button className="btn-large red waves-effect">Reject</button></div>
        </div>
      </div>
    );
  } else {
      return (
        <div className="container center">
          <p>Loading proposal...</p>
        </div>
      );
  }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const proposals = state.firestore.data.proposals;
    const proposal = proposals ? proposals[id] : null;
    return {
      proposal: proposal
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'proposals' }
  ])
)(ProposalDetails);
