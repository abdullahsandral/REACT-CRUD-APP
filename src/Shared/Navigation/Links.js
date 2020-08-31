import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import AuthContext from '../Context/AuthenticationContext';

const NavLinks = props => {
  const AContext = useContext(AuthContext)
  const LoggedIn = useContext(AuthContext).loggedIn;

  const AuthenticatedLinks = <>
    <Link to='/profile'>EDIT PROFILE</Link>
    <Link to='/new-post'>NEW POST</Link>
    <Link to='/google-map'>VIEW MAP</Link>
    <Link to='/calculator'>CALCULATOR</Link>
    <Link to='/web-cam'>WEB CAM</Link>
    <Link to='/login' onClick={() => AContext.logout()}>SIGN OUT</Link>
  </>
  const UNAuthenticatedLinks = <>
    <Link to='/signup'>SIGN UP</Link>
    <Link to='/login'>SIGN IN</Link>
  </>
  return <>
    <Link to='/dashboard'>ALL POSTS</Link>
    {LoggedIn && AuthenticatedLinks}
    {!LoggedIn && UNAuthenticatedLinks}
  </>
}

export default NavLinks;