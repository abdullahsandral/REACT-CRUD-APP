import React from 'react';

import Links from './Links';
import classes from './Navigation.module.css';

const SideDrawer = props => {
  return <div className={classes.sideDrawer} onClick={props.drawerClicked}>
    <Links />
  </div>
}

export default SideDrawer;