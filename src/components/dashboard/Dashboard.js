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

    if (typeof prevProps.proposals === "undefined") {
      this.setState({
        filter: recent.value
      });
    }
  }

  componentDidMount() {
    if (typeof this.props.proposals !== "undefined") {
      const semesters = this.getSemesterChoices();
      const recent = this.findMostRecentSemester(semesters);
      this.setState({
        filter: recent.value
      });
    }
  }

  sendMail() {
    console.log("Send mail");
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

          <div className="container">
            <h5 className="roboto-font dashboard-h">New</h5>
            <ProposalList proposals={this.getProposalsByCategory(0)} />
            <div className="center">
              <button onClick={this.sendMail} className="btn waves-effect green darken-2">Email group</button>
            </div>
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Accepted</h5>
            <ProposalList proposals={this.getProposalsByCategory(1)} />
            <div className="center">
              <button onClick={this.sendMail} className="btn waves-effect green darken-2">Email group</button>
            </div>
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Maybe</h5>
            <ProposalList proposals={this.getProposalsByCategory(2)} />
            <div className="center">
              <button onClick={this.sendMail} className="btn waves-effect green darken-2">Email group</button>
            </div>
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Rejected</h5>
            <ProposalList proposals={this.getProposalsByCategory(3)} />
            <div className="center">
              <button onClick={this.sendMail} className="btn waves-effect green darken-2">Email group</button>
            </div>
          </div>
          <p><br /></p>
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
