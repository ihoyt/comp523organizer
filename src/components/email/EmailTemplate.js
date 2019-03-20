import React, { Component } from 'react';

class EmailTemplate extends Component {
  const type = this.props.type;

  state = {
    subject: '',
    body: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  }

  render() {
    return(
      <Collapsible trigger= {type}" Proposals">
        <form onSubmit={this.handleSubmit} className="white">
         <h5 className="grey-text text-darken-3">Request Proposals</h5>
         <div className="input-field">
           <label htmlFor="subject">Subject Line</label>
           <input type="text" id="subject" onChange={this.handleChange}/>
         </div>
         <div className="input-field">
           <label htmlFor="body">Email Body</label>
           <textarea id="body" className="materialize-textarea" onChange={this.handleChange}></textarea>
         </div>
         <div className="input-field">
           <button className="btn blue z-depth-0">Submit changes</button>
         </div>
       </form>
     </Collapsible>
    )
  }
}
