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
        return proposal.category === category && proposal.semester === filter;
      });
      return pros;
    }
  }

  getSemesterChoices = () => {
    const { proposals } = this.props;
    let choices = [];
    let distinct = []; // Used to track if semester has already been added as option

    if (proposals) {
      proposals.forEach(function(proposal) {
        if (!distinct.includes(proposal.semester) && proposal.semester !== ""
              && typeof proposal.semester !== "undefined") {
          distinct.push(proposal.semester);
          choices.push({ value: proposal.semester, label: proposal.semester });
        }
      });
    }
    return choices;
  }

  handleChange = (filter) => {
    this.setState({
        filter: filter.value}, () => {
    });
  }

  findMostRecentSemester(semesters) {
    let recent = semesters[0];
    for (let i = 0; i < semesters.length; i++) {
      var year = semesters[i].value.replace( /^\D+/g, '');
      if (year > recent.value.replace( /^\D+/g, '')) {
        recent = semesters[i];
      } else if (year === recent.value.replace( /^\D+/g, '')) {
        if (recent.value.includes("Spring") && semesters[i].value.includes("Fall")) {
          recent = semesters[i];
        }
      }
    }
    return recent;
  }

  componentDidUpdate(prevProps, prevState) {
    const semesters = this.getSemesterChoices();
    const recent = this.findMostRecentSemester(semesters);
    console.log(prevProps);
    if (typeof prevProps.proposals === "undefined") {
      this.setState({
        filter: recent.value
      });
    }
  }

  render() {
    const { proposals } = this.props;

    if (proposals) {
      let semesters = this.getSemesterChoices();
      const recent = this.findMostRecentSemester(semesters);

      return(
        <div className="dashboard">
          <div className="container filter-container">
            <Select
              defaultValue={ recent }
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
    } else {
      return(
        <div>Loading proposals</div>
      )
    }
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
