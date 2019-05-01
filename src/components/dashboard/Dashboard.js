import React, { Component } from 'react';
import ProposalList from '../proposal/ProposalList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Select from 'react-select';
import Modal from 'react-modal';

// Styling for email modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%'
  }
};

class Dashboard extends Component {

  state = {
    filter: null,
    modalIsOpen: false,
    template: { subject: "No template specified", body: ""}
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

  handleChange = (filter) => {
    this.setState({
        filter: filter.value}, () => {
    });
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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.sendMail = this.sendMail.bind(this);

    Modal.setAppElement("#dashboard-div");
    if (typeof this.props.proposals !== "undefined") {
      const semesters = this.getSemesterChoices();
      const recent = this.findMostRecentSemester(semesters);
      this.setState({
        filter: recent.value
      });
    }
  }

  sendMail() {
    const { template } = this.state;
    const category = template.type === "accepted" ? 1 :
                      template.type === "maybe" ? 2 :
                      3;
    let emails = [];
    const proposals = this.getProposalsByCategory(category);
    proposals.forEach(function(p) {
      emails.push(p.proposeeEmail)
    });
    
  }

  openModal(e) {
    const type = e.target.name.split("-")[1];

    const { emails } = this.props;
    let template = null;

    if (emails) {
      template = emails.filter(email => {
        return email.type === type;
      });
      template = template ? template[0] : null;
    }

    this.setState({
      modalIsOpen: true,
      template: template
    });
  }

  afterOpenModal() {
    document.getElementById("template-body").innerHTML = this.state.template.body;
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const { proposals } = this.props;

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
            <div className="center">
              <button name="email-accepted" onClick={this.openModal} className="btn green darken-2">Email group</button>
            </div>
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Maybe</h5>
            <ProposalList proposals={this.getProposalsByCategory(2)} />
            <div className="center">
              <button name="email-maybe" onClick={this.openModal} className="btn green darken-2">Email group</button>
            </div>
          </div>
          <div className="container">
            <h5 className="roboto-font dashboard-h">Rejected</h5>
            <ProposalList proposals={this.getProposalsByCategory(3)} />
            <div className="center">
              <button name="email-rejected" onClick={this.openModal} className="btn green darken-2">Email group</button>
            </div>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            onAfterOpen={this.afterOpenModal}
            style={customStyles}
            contentLabel="Agreement"
           >
           <div className="modal-div">
             <div className="container">
               <h5>{template.subject}</h5>
               <div id="template-body">
               </div>
             </div>
             <div className="row">
               <div className="col s3"><button className="btn blue" onClick={this.sendMail}>Send email</button></div>
               <div className="col s3"><button className="btn red" onClick={this.closeModal}>Close</button></div>
             </div>
           </div>
         </Modal>
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
      emails: state.firestore.ordered.emails
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    'proposals', 'emails'
  ])
)(Dashboard);
