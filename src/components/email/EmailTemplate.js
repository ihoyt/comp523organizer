import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class EmailTemplate extends Component {

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
    console.log(this.state);
  }

  render() {

    let type = this.props.email[0].type;
    type = type.charAt(0).toUpperCase() + type.slice(1);
    const formTitle = type + " Proposals";

    return(
      <Collapsible trigger={formTitle}>
        <form onSubmit={this.handleSubmit} className="white">
         <h5 className="grey-text text-darken-3">{type}</h5>
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


export default EmailTemplate;
