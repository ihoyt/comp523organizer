import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
  // The actual UI HTML elements for navigating the different routes of
  // the web app

  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : null;
  return (
    <nav className='nav-wrapper blue darken-3'>
      <div className='container'>
        {links}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar);
