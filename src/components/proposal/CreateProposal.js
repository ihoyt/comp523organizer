import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProposal } from '../../store/actions/proposalActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CreateProposal extends Component {
  state = {
    title: '',
    summary: '',
    proposeeFname: '',
    proposeeLname: '',
    proposeeEmail: '',
    proposeeOrg:'',
    proposeePhone: '',
    proposeeURL: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.createProposal(this.state);
    this.props.history.push('/');
  }

  render() {
    if (!this.props.agreement) {
      return(
        <div id="proposal-form">Loading form...</div>
      )
    } else {
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
           <input type="text" id="proposeeEmail" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeeOrg">Organization</label>
           <input type="text" id="proposeeOrg" className="materialize-textarea" onChange={this.handleChange} />
         </div>
         <div className="input-field">
           <label htmlFor="proposeePhone">Phone Number</label>
           <input type="text" id="proposeePhone" className="materialize-textarea" onChange={this.handleChange} />
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
         <div className="input-field">
           <button className="btn blue z-depth-0">Submit Proposal</button>
         </div>
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
