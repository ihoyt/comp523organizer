import React from 'react';
import ProposalSummary from './ProposalSummary';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const ProposalList = ({proposals, category}) => {
  let settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3
  }
  if ({proposals}) {
    return(
      <div className="proposal-list section">
        <Slider {...settings}>
        { proposals && proposals.map(proposal => {
          if (proposal.title !== '' && proposal.category == category) {
            return(
              <div>
                <Link to={'/proposal/' + proposal.id }>
                  <ProposalSummary proposal={proposal} key={proposal.id} />
                </Link>
              </div>
            )
          }
        })}
        </Slider>
      </div>
    );
  }
}

export default ProposalList;
