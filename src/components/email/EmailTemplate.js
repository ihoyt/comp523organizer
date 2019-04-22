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
          body: quill.state.value
        });

    }
  }

  handleSubmit = (e) => {
    const { email } = this.props;
    e.preventDefault();
    if (typeof this.state.body === 'undefined') {
      let quill = this.refs.quill;
      this.setState({
        body: quill.state.value
      }, () => {
        const templateChange = {
          ...this.state,
          type: email.type,
          id: email.id
        }

        this.props.changeEmailTemplate(templateChange);
        let div = this.refs.changemsg;
        if (div.childNodes.length > 0) {
          div.removeChild(div.childNodes[0]);
        }
        div.append("Changes submitted");
      })
    } else {
        const templateChange = {
          ...this.state,
          type: email.type,
          id: email.id
        }

        this.props.changeEmailTemplate(templateChange);
        let div = this.refs.changemsg;
        if (div.childNodes.length > 0) {
          div.removeChild(div.childNodes[0]);
        }
        div.append("Changes submitted");
      }
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
        let quill = this.refs.quill;
        quill.getEditor().pasteHTML(this.state.body);

        if (this.state.subject !== "") {
          let subj_label = this.refs.subject_label;
          subj_label.className += "active";
        }
      });
    }
  }

  render() {
    const { email } = this.props;
    if (email) {

      let type = email.type;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      const formTitle = type === 'Agreement' ? type : type + " Proposals";

      return(
        <Collapsible trigger={formTitle}>
          <form onSubmit={this.handleSubmit} className="white" ref="form">
           <h5 className="grey-text text-darken-3">{type}</h5>
           <div className="input-field">
             <label htmlFor="subject" ref="subject_label">Subject Line</label>
             <input type="text" id="subject" ref="subject" onChange={this.handleChange}/>
           </div>
           <div>
              <label>Body</label>
              <ReactQuill ref="quill" onChange={this.handleChange} />
            </div>
           <div className="input-field">
             <button className="btn blue z-depth-0" onClick={this.handleSubmit}>Submit changes</button>
           </div>
           <div id='change-msg' ref="changemsg">
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
