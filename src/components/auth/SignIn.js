import React, { Component } from 'react';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  // Use the event object e to update the state when this is called
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  // This is to stop the default behavior of the submit button, and disallow
  // weirdness that might happen if the form auto-submitted
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
