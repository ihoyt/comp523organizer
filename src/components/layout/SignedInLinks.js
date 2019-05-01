import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
    <div>
    <Link to='/' className='brand-logo'>SELO</Link>
    <ul className='right'>
      <li><NavLink to='/'>Dashboard</NavLink></li>
      <li><NavLink to='/create'>New Proposal</NavLink></li>
      <li><NavLink to='/sendmail'>Send Email</NavLink></li>
      <li><NavLink to='/templates'>Templates</NavLink></li>
      <li><a href='/signin' onClick={props.signOut}>Log Out</a></li>
    </ul>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
