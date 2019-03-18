import React from 'react';

const ProposalSummary = ({proposal}) => {
  return(
    <div className="card z-depth-0 proposal-summary">
      <div className="card grey-text text-darken-3">
        <span className="card-title">{proposal.title}</span>
        <p>Submitted by { proposal.proposeeFname } { proposal.proposeeLname }</p>
        <p className="grey-text">3rd September, 2am</p>
      </div>
    </div>
  );
}

export default ProposalSummary;
