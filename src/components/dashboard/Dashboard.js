import React, { Component } from 'react';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  // The props passed to this component will be a ProposalList as defined in
  // ../proposal/ProposalList

  state = {
    filter: null
  }

  getProposalsByCategory = (category) => {
    const { proposals } = this.props;
    const { filter } = this.state;

    if (proposals) {
      let pros = proposals.filter(proposal => {
        return proposal.category === category && proposal.semester === filter;
      }); // Returns a ProposalList filtered both by the semester and category
      return pros;
    }
  }

  // Returns an array of all the semesters that have proposals in them
  getSemesterChoices = () => {
    const { proposals } = this.props;

    let choices = [];
    let distinct = []; // Used to track if semester has already been added as option

    if (proposals) {
      proposals.forEach(function(proposal) {
        // Checks each proposal to see if its blank, exists, or has a category
        // that's already been added
        if (!distinct.includes(proposal.semester) && proposal.semester !== ""
              && typeof proposal.semester !== "undefined") {
          distinct.push(proposal.semester);
          choices.push({ value: proposal.semester, label: proposal.semester });
        }
      });
    }
    return choices;
  }

  findMostRecentSemester(semesters) {
    let recent = semesters[0];
    for (let i = 0; i < semesters.length; i++) {
      // Deletes any char in the semester that's not
      // a digit and sets year to it
      var year = semesters[i].value.replace( /^\D+/g, '');
      // If current most recent year same as iterated semester
      if (year > recent.value.replace( /^\D+/g, '')) {
        recent = semesters[i];
      } else if (year === recent.value.replace( /^\D+/g, '')) {  //if same year
        // Most recent if the iterated semester is the Fall semester
        if (recent.value.includes("Spring") && semesters[i].value.includes("Fall")) {
          recent = semesters[i];
        }
      }
    }
    return recent;
  }

  // Sets the filer to what was chosen in the drop-down menu
  handleChange = (filter) => {
    this.setState({
        filter: filter.value}, () => {
    });
  }

  // On component update, set the filter to the most recent semester
  componentDidUpdate(prevProps, prevState) {
    const semesters = this.getSemesterChoices();
    const recent = this.findMostRecentSemester(semesters);

    if (typeof prevProps.proposals === "undefined") {
      this.setState({
        filter: recent.value
      });
    }
  }

  // On component mount, set the filter to the most recent semester
  componentDidMount() {
    if (typeof this.props.proposals !== "undefined") {
      const semesters = this.getSemesterChoices();
      const recent = this.findMostRecentSemester(semesters);
      this.setState({
        filter: recent.value
      });
    }
  }


  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='signin' />
    const { proposals } = this.props;

    // Only render main aspect of the dashboard if there are any proposals to
    // show
    if (proposals) {
      let semesters = this.getSemesterChoices();
      const recent = this.findMostRecentSemester(semesters);
      let template = this.state.template;

      return(
        <div className="dashboard" id="dashboard-div">
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
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Accepted</h5>
            <ProposalList proposals={this.getProposalsByCategory(1)} />
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Maybe</h5>
            <ProposalList proposals={this.getProposalsByCategory(2)} />
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Rejected</h5>
            <ProposalList proposals={this.getProposalsByCategory(3)} />
          </div>
          <p><br /></p>
        </div>
      );
    } else {
      return(
        <div id="dashboard-div">Loading proposals</div>
      )
    }
  };
}

const mapStateToProps = (state) => {
  return {
      proposals: state.firestore.ordered.proposals,
      emails: state.firestore.ordered.emails,
      auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    'proposals', 'emails'
  ])
)(Dashboard);
