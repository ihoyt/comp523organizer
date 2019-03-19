import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <ul className='right'>
      <li><NavLink to='/create'>New Proposal</NavLink></li>
      <li><NavLink to='/' className="btn btn-floating orange darken-3">IH</NavLink></li>
    </ul>
  );
}

export default SignedInLinks;
