import React, {Component} from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    return(
        <div className={classes.Burger}>
        {/* the type below is used for prop-types validation 
        in BurgerIngredient */}
        <BurgerIngredient type="bread-top" />
        <BurgerIngredient type="salad"/>
        <BurgerIngredient type="cheese" />
        <BurgerIngredient type="meat" />
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
