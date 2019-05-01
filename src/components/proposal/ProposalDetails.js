import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { changeProposalCategory } from '../../store/actions/proposalActions';
import { Redirect } from 'react-router-dom';

const  ProposalDetails = (props) => {
  const { proposal, id } = props;
  // Maps proposal prop number passed in to a corrresponding string
  const category =  !proposal ? null
                    : proposal.category === 0 ? 'New'
                    : proposal.category === 1 ? 'Accepted'
                    : proposal.category === 2 ? 'Maybe'
                    : 'Rejected';

  // Prevents default submission behavior, and invokes function passed in
  // from props
  const handleSubmit = (e) => {
    e.preventDefault();
    if (proposal) {
      const categoryChange = {
        proposal: proposal,
        id: id,
        category: parseInt(e.target.name)
      }
      props.changeProposalCategory(categoryChange);
    }
  }

  if (proposal) {
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />
    let url = '';
    if (proposal.proposeeURL) {
      url = proposal.proposeeURL.includes('http') ? proposal.proposeeURL : 'http://' + proposal.proposeeURL;
    }
    return (
    <div className="container section proposal-details">
      <div className="card z-depth details-card">
        <div className="card-content">
          <span className="card-title">{ proposal.title }</span>
          <p>{ proposal.summary }</p>
          <p><br /></p>
          <a href={url}>{ proposal.proposeeURL}</a>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Submitted by { proposal.proposeeFname } { proposal.proposeeLname }</div>
          <span>{proposal.proposeeEmail} - </span><span>{proposal.proposeePhone}</span>
          <div>{proposal.proposeeOrg}</div>
        </div>
      </div>
      <div className="row btn-row">
        <div className="col s4"><button name="1" className="btn-large blue waves-effect" type="submit" onClick={handleSubmit}>Accept</button></div>
        <div className="col s4"><button name="2" className="btn-large waves-effect" type="submit" onClick={handleSubmit}>Maybe</button></div>
        <div className="col s4"><button name="3" className="btn-large red waves-effect" type="submit" onClick={handleSubmit}>Reject</button></div>
      </div>
      <p>Proposal is currently: <strong>{category}</strong></p>
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
      proposal: proposal,
      id: id,
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeProposalCategory: (categoryChange) => dispatch(changeProposalCategory(categoryChange))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'proposals' }
  ])
)(ProposalDetails);
