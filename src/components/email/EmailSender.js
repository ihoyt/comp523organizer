import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as emailjs from 'emailjs-com'
import { Modal, Button } from 'react-materialize';

const trigger =   <div className="card-action">
    <a href="#">Send Email</a>
  </div>;

class EmailSender extends Component {

  constructor(props) {
    super(props)
  }

  sendEmail = () => {
    var templateParams = {
        name: 'Varun',
        notes: 'This is an accepted email note'
    };

    emailjs.send('default_service','template_fRAQXhhU', templateParams, 'user_sR7mHlQWNwydabhlr3vbq')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(err) {
           console.log('FAILED...', err);
        });
  }


  render() {
    console.log(this.props);
    return(
      <div className="container email-sender">
        <h3 className="center">Send Mail</h3>
        <div className="col s12 m7">
        <h2 className="header"> Send Accepted Email Template</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img src="https://lorempixel.com/100/190/nature/1" />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>This is the template from the accepted emails</p>
            </div>

            <Modal header="Accepted Email Template" trigger={trigger}>
           <h5>  This is the template from the accepted emails </h5>
          <br />
          <br />

          <div className='row'>
          <a onClick={this.sendEmail()}


          class="waves-effect waves-light btn col s6">Send</a>
          <a class="waves-effect waves-light red btn col s6">Cancel</a>
          </div>
              </Modal>
          </div>
        </div>
      </div>






      <div className="col s12 m7">
      <h2 className="header"> Send Requested Email Template</h2>
      <div className="card horizontal">
        <div className="card-image">
          <img src="https://lorempixel.com/100/190/nature/2" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>This is the template from the requested  emails.</p>
          </div>
          <Modal header="Accepted Email Template" trigger={trigger}>
         <h5>  This is the template from the accepted emails </h5>
        <br />
        <br />

        <div className='row'>
        <a class="waves-effect waves-light btn col s6">Send</a>
        <a class="waves-effect waves-light red btn col s6">Cancel</a>
        </div>

            </Modal>
        </div>
      </div>
    </div>







    <div className="col s12 m7">
    <h2 className="header"> Send Maybe Email Template</h2>
    <div className="card horizontal">
      <div className="card-image">
        <img src="https://lorempixel.com/100/190/nature/3" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p>This is the template from the maybe emails..</p>
        </div>
        <Modal header="Accepted Email Template" trigger={trigger}>
       <h5>  This is the template from the accepted emails </h5>
      <br />
      <br />

      <div className='row'>
      <a class="waves-effect waves-light btn col s6">Send</a>
      <a class="waves-effect waves-light red btn col s6">Cancel</a>
      </div>

          </Modal>
      </div>
    </div>
  </div>




  <div className="col s12 m7">
  <h2 className="header"> Send Rejected Email Template</h2>
  <div className="card horizontal">
    <div className="card-image">
      <img src="https://lorempixel.com/100/190/nature/4" />
    </div>
    <div className="card-stacked">
      <div className="card-content">
        <p>This is the template from the rejected emails..</p>
      </div>
      <Modal header="Accepted Email Template" trigger={trigger}>
     <h5>  This is the template from the accepted emails </h5>
    <br />
    <br />

    <div className='row'>
    <a class="waves-effect waves-light btn col s6">Send</a>
    <a class="waves-effect waves-light red btn col s6">Cancel</a>
    </div>

        </Modal>
    </div>
  </div>
</div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
      emails: state.firestore.ordered.emails
  };
};


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'emails'
   }
  ])
)(EmailSender);
