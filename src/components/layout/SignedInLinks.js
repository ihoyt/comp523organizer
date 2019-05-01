import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <ul className='right'>
      <li><NavLink to='/'>Dashboard</NavLink></li>
      <li><NavLink to='/create'>New Proposal</NavLink></li>
      <li><NavLink to='/sendmail'>Send Email</NavLink></li>
      <li><NavLink to='/templates'>Templates</NavLink></li>
    </ul>
  );
}

export default SignedInLinks;
