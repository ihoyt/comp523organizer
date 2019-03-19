import React from 'react';

const ProposalSummary = ({proposal}) => {
  return(
    <div className="card z-depth-0 proposal-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{proposal.title}</span>
        <p>{proposal.summary.substring(0, 60)}</p>
        <p className="grey-text">Submitted by { proposal.proposeeFname } { proposal.proposeeLname }</p>
      </div>
    </div>
  );
}

export default ProposalSummary;
