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
            <p>{ proposal.content }</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by { proposal.authorFirstName } { proposal.authorLastName }</div>
            <div>2nd September, 2am</div>
          </div>
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
