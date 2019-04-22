import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProposal } from '../../store/actions/proposalActions';
import Modal from 'react-modal';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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

class CreateProposal extends Component {
  state = {
    title: '',
    summary: '',
    proposeeFname: '',
    proposeeLname: '',
    proposeeEmail: '',
    proposeeOrg:'',
    proposeePhone: '',
    proposeeURL: '',
    modalIsOpen: false,
    hasAcceptedAgreement: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  componentDidMount() {
    Modal.setAppElement("#proposal-form");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.createProposal(this.state);
    this.props.history.push('/');
  }

  openModal= () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  acceptAgreement = (e) => {
    this.setState({
      hasAcceptedAgreement: true
    }, () => {
      this.closeModal();
      document.getElementById("agreement-msg").remove();
    });
  }

  render() {
    if (!this.props.agreement) {
      return(
        <div id="proposal-form">Loading form...</div>
      )
    } else {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = this.props.agreement[0].body;
      const body = tempDiv.textContent || tempDiv.innerText || "";
    return(
      <div className="container" id="proposal-form">
        <form onSubmit={this.handleSubmit} className="white create-form">
         <h5 className="grey-text text-darken-3">Create Proposal</h5>
         <h6>Contact Information</h6>
         <div className="input-field">
           <label htmlFor="proposeeFname">First Name</label>
           <input type="text" id="proposeeFname" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeeLname">Last Name</label>
           <input type="text" id="proposeeLname" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeeEmail">Email</label>
           <input type="email" id="proposeeEmail" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeeOrg">Organization</label>
           <input type="text" id="proposeeOrg" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeePhone">Phone Number</label>
           <input type="tel" id="proposeePhone" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <h6>Proposal Details</h6>
           <div className="input-field">
             <label htmlFor="title">Title</label>
             <input type="text" id="title" onChange={this.handleChange} />
           </div>
           <div className="input-field">
             <label htmlFor="proposeeURL">(optional) Link to any web resources related to your proposal</label>
             <input type="text" id="proposeeURL" onChange={this.handleChange}/>
           </div>
           <div>
             <label>Project Summary</label>
             <textarea type="text" id="summary" onChange={this.handleChange} rows="10" className="summary-textarea"></textarea>
           </div>
           <div>
             <p id="agreement-msg">You must sign the client agreement to continue</p>
             <button className="btn green z-depth-0" type="button" onClick={this.openModal}>Client agreement</button>
           </div>
           <div className="input-field">
             <button className="btn blue z-depth-0" ref="submit" disabled={!this.state.hasAcceptedAgreement}>Submit Proposal</button>
           </div>

         <Modal
           isOpen={this.state.modalIsOpen}
           onRequestClose={this.closeModal}
           style={customStyles}
           contentLabel="Agreement"
          >
          <div className="modal-div">
            <h3 id="agreement-header">{this.props.agreement[0].subject}</h3>
            <div id="agreement">{body}</div>
            <p><br /></p>
            <div className="row">
            <div className="col s2">
              <button className="btn blue" ref="accept" disabled={this.state.hasAcceptedAgreement} onClick={this.acceptAgreement}>Accept</button>
            </div>
            <div className="col s2"><button className="btn" onClick={this.closeModal}>Close</button></div>
            </div>
          </div>
        </Modal>
       </form>
      </div>
    );
  }
}
}

const mapStateToProps = (state) => {
  return {
    agreement: state.firestore.ordered.emails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createProposal: (proposal) => dispatch(createProposal(proposal))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'emails',
      where: [['type', '==', 'agreement']]
    }
  ])
)(CreateProposal);
