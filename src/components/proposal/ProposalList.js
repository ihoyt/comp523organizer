import React from 'react';
import ProposalSummary from './ProposalSummary';
import { Link } from 'react-router-dom';

const ProposalList = ({proposals}) => {
  return(
    <div className="proposal-list section">
      { proposals && proposals.map(proposal => {
        if (proposal.title !== '') {
          return(
            <Link to={'/proposal/' + proposal.id }>
              <ProposalSummary proposal={proposal} key={proposal.id} />
            </Link>
          )
        }
      })}
    </div>
  );
}

export default ProposalList;
