import React from 'react';
import ProposalSummary from './ProposalSummary';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const ProposalList = ({proposals}) => {
  let settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  }


  // Needs this, otherwise there's weird behavior with less than 3 items
  if (proposals && (proposals.length < 3 && proposals.length > 0)) {
    settings = {
      ...settings,
      slidesToShow: proposals.length,
      slidesToScroll: proposals.length
    }
  }

  if (proposals && proposals.length > 0) {
    return(
      <div className="proposal-list section">
        <Slider {...settings}>
        { proposals && proposals.map(proposal => {
          if (proposal.title !== '') {
            return(
                <Link to={'/proposal/' + proposal.id } key={'/proposal/' + proposal.id}>
                  <ProposalSummary proposal={proposal} key={proposal.id} />
                </Link>
            )
          }
        })}
        </Slider>
      </div>
    );
  } else {
    return (
      <div className="proposal-list section center">
        <p>No proposals</p>
      </div>
    )
  }
}

export default ProposalList;
