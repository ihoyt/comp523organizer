import React, { Component } from 'react';

class EmailSender extends Component {
  state = {
    text: ''
  }

  handleChange = (e) => {
    console.log(e);
  }

  render() {
    return(
      <div className="container email-sender">
        <h3 className="center">Send Mail</h3>
      </div>
    )
  }
}

export default EmailSender;
