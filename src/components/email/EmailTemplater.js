import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class EmailTemplater extends Component {
  state = {
    request: {
      subject: '',
      body: ''
    },
    accept: {
      subject: '',
      body: ''
    },
    maybe: {
      subject: '',
      body: ''
    },
    reject: {
      subject: '',
      body: ''
    },
  }

  render() {
    return(
      <div className="container email-templater">
        <h3 className="center">Email Templates</h3>
        <Collapsible trigger="Request Proposals">
          <form onSubmit={this.handleSubmit} className="white">
           <h5 className="grey-text text-darken-3">Request Proposals</h5>
           <div className="input-field">
             <label htmlFor="request-subject">Subject Line</label>
             <input type="text" id="request-subject" onChange={this.handleChange}/>
           </div>
           <div className="input-field">
             <label htmlFor="request-body">Email Body</label>
             <textarea id="request-body" className="materialize-textarea" onChange={this.handleChange}></textarea>
           </div>
           <div className="input-field">
             <button className="btn blue z-depth-0">Submit changes</button>
           </div>
         </form>
       </Collapsible>
       <Collapsible trigger="Accepted Proposals">
         <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Accepted</h5>
          <div className="input-field">
            <label htmlFor="accept-subject">Subject Line</label>
            <input type="text" id="accept-subject" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="accept-body">Email Body</label>
            <textarea id="accept-body" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn blue z-depth-0">Submit changes</button>
          </div>
        </form>
      </Collapsible>
      <Collapsible trigger="Maybe Proposals">
        <form onSubmit={this.handleSubmit} className="white">
         <h5 className="grey-text text-darken-3">Maybes</h5>
         <div className="input-field">
           <label htmlFor="maybe-subject">Subject Line</label>
           <input type="text" id="maybe-subject" onChange={this.handleChange}/>
         </div>
         <div className="input-field">
           <label htmlFor="maybe-body">Email Body</label>
           <textarea id="maybe-body" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <button className="btn blue z-depth-0">Submit changes</button>
         </div>
       </form>
     </Collapsible>
      <Collapsible trigger="Rejected Proposals">
       <form onSubmit={this.handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Rejected</h5>
        <div className="input-field">
          <label htmlFor="reject-subject">Subject Line</label>
          <input type="text" id="reject-subject" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
          <label htmlFor="reject-body">Email Body</label>
          <textarea id="reject-body" className="materialize-textarea" onChange={this.handleChange}></textarea>
        </div>
        <div className="input-field">
          <button className="btn blue z-depth-0">Submit changes</button>
        </div>
      </form>
    </Collapsible>
    </div>
    )
  }
}

export default EmailTemplater;
