import React, { Component } from 'react';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Select from 'react-select';

class Dashboard extends Component {
  state = {
    filter: null
  }

  getProposalsByCategory = (category) => {
    const { proposals } = this.props;
    const { filter } = this.state;

    if (proposals) {
      let pros = proposals.filter(proposal => {
        if (!filter || filter === "all") {
          return proposal.category === category;
        } else if (filter && filter !== "all") {
          return proposal.category === category && proposal.semeseter === filter;
        }
      });
      return pros;
    }
  }

  getSemesterChoices = () => {
    const { proposals } = this.props;
    let choices = [{ value: 'all', label: 'All'}];
    let distinct = []; // Used to track if semester has already been added as option

    if (proposals) {
      proposals.forEach(function(proposal) {
        if (!distinct.includes(proposal.semeseter) && proposal.semeseter !== ""
              && typeof proposal.semeseter !== "undefined") {
          distinct.push(proposal.semeseter);
          choices.push({ value: proposal.semeseter, label: proposal.semeseter });
        }
      });
    }

    return choices;
  }

  handleChange = (filter) => {
    this.setState({
        filter: filter.value}, () => {
      console.log(this.state);
    });
  }

  render() {
    let semesters = this.getSemesterChoices();

    return(
      <div className="dashboard">
        <div className="container filter-container">
          <Select
            defaultValue={ {value: 'all', label: "All"} }
            options={semesters}
            onChange={this.handleChange}
          />
        </div>
        <h3 className="roboto-font center dashboard-h">New</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(0)} />
        </div>
        <h3 className="roboto-font center dashboard-h">Accepted</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(1)} />
        </div>
        <h3 className="roboto-font center dashboard-h">Maybe</h3>
        <div className="container">
          <ProposalList proposals={this.getProposalsByCategory(2)} />
        </div>
        <h3 className="roboto-font center dashboard-h">Rejected</h3>
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
