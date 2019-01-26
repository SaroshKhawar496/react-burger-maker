import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}> 
        <NavLink 
        // following allows us to use the css style we have defined
        activeClassName={classes.active}
        exact={props.exact}
        to={props.link}
        // NavLink from router will automatically do the line below
        // className={props.active ? classes.active : null}
        >
        {props.children}
        </NavLink> 
    </li>
);

export default navigationItem;