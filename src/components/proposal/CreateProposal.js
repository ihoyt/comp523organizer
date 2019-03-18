import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProposal } from '../../store/actions/proposalActions';

class CreateProposal extends Component {
  state = {
    title: '',
    summary: '',
    proposeeFname: '',
    proposeeLname: '',
    proposeeEmail: ''
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
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
         <h5 className="grey-text text-darken-3">Create Proposal</h5>
         <div className="input-field">
           <label htmlFor="title">Title</label>
           <input type="text" id="title" onChange={this.handleChange}/>
         </div>
         <div className="input-field">
           <label htmlFor="summary">Project Summary</label>
           <textarea id="summary" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <label htmlFor="proposeeFname">First Name</label>
           <textarea id="proposeeFname" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <label htmlFor="proposeeLname">Last Name</label>
           <textarea id="proposeeLname" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <label htmlFor="proposeeEmail">Email</label>
           <textarea id="proposeeEmail" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <button className="btn blue z-depth-0">Submit Proposal</button>
         </div>
       </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createProposal: (proposal) => dispatch(createProposal(proposal))
  };
};

export default connect(null, mapDispatchToProps)(CreateProposal);
