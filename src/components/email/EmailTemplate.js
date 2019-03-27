import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { changeEmailTemplate } from '../../store/actions/emailActions';

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
    const { email } = this.props;

    e.preventDefault();
    const templateChange = {
      ...this.state,
      type: email.type,
      id: email.id
    }

    this.props.changeEmailTemplate(templateChange);
  }

  componentDidMount() {
    const {email} = this.props;
    if (email) {
      this.setState({
        subject: email.subject,
        body: email.body
      });
      console.log(this.state);
    }
  }

  render() {
    const { email } = this.props;
    if (email) {

      let type = email.type;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      const formTitle = type + " Proposals";

      return(
        <Collapsible trigger={formTitle}>
          <form onSubmit={this.handleSubmit} className="white">
           <h5 className="grey-text text-darken-3">{type}</h5>
           <div className="input-field">
             <label htmlFor="subject">Subject Line</label>
             <input type="text" id="subject" ref="subject" onChange={this.handleChange}/>
           </div>
           <div className="input-field">
             <label htmlFor="body">Email Body</label>
             <textarea id="body" className="materialize-textarea" ref="body" onChange={this.handleChange}></textarea>
           </div>
           <div className="input-field">
             <button className="btn blue z-depth-0" onClick={this.handleSubmit}>Submit changes</button>
           </div>
         </form>
       </Collapsible>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: ownProps.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeEmailTemplate: (templateChange) => dispatch(changeEmailTemplate(templateChange))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplate);
