import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { changeEmailTemplate } from '../../store/actions/emailActions';
import ReactQuill from 'react-quill';

class EmailTemplate extends Component {

  state = {
    subject: '',
    body: ''
  }

  handleChange = (e) => {
    if (e.target) {
      this.setState({
        [e.target.id]: e.target.value
      });
    } else {
        let quill = this.refs.quill;
        this.setState({
          body: quill.getEditor().getText()
        });
    }
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
    let form = this.refs.form;
    form.append("Changes submitted");
  }

  componentDidMount() {
    const {email} = this.props;
    if (email) {
      this.setState({
        subject: email.subject,
        body: email.body
      }, () => {
        let subj_input = this.refs.subject;
        subj_input.value = this.state.subject;
        let body_input = this.refs.body;
        body_input.value = this.state.body;

        if (this.state.subject !== "") {
          let subj_label = this.refs.subject_label;
          subj_label.className += "active";
          let body_label = this.refs.body_label;
          body_label.className += "active";
        }
      });
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
          <form onSubmit={this.handleSubmit} className="white" ref="form">
           <h5 className="grey-text text-darken-3">{type}</h5>
           <div className="input-field">
             <label htmlFor="subject" ref="subject_label">Subject Line</label>
             <input type="text" id="subject" ref="subject" onChange={this.handleChange}/>
           </div>
           <div className="input-field">
             <label htmlFor="body" ref="body_label">Email Body</label>
             <textarea id="body" className="materialize-textarea" ref="body" onChange={this.handleChange}></textarea>
           </div>
           <ReactQuill ref="quill" value={this.state.body} onChange={this.handleChange} />
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
