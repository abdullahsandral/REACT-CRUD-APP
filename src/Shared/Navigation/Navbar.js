import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';

import Backdrop from '../UI-Elements/Backdrop';
import SideDrawer from './SideDrawer';
import Links from './Links';
import AuthContext from '../Context/AuthenticationContext';
import classes from './Navigation.module.css';

const Nabar = props => {
  const [drawerState, setDrawerState] = useState();
  const Authenticated = useContext(AuthContext)

  const DrawerHandler = () => {
    setDrawerState(!drawerState);
  }

  let S_Drawer = <div className={classes.sideDrawer}>
    <SideDrawer drawerClicked={DrawerHandler} />
    <Backdrop backdropClicked={DrawerHandler} />
  </div>
  return <>
    {drawerState && S_Drawer}
    <div className={classes.Navbar}>
      <button className={classes.menuBtn} onClick={DrawerHandler}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div>
        <h4>{Authenticated.userName}</h4>
      </div>
      <div className={classes.NavLinks}>
        <Links />
      </div>
    </div>
  </>
}
export default Nabar;