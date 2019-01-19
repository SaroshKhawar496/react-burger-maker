import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //transforming the props object given. its an object not
    //an array so can't use the map function
    // Object.keys return an array

/*     const object1 = {
        a: 'somestring',
        b: 42,
        c: false
      };
      
      console.log(Object.keys(object1));
      // expected output: Array ["a", "b", "c"] */

      /* Note for map fxns below:
      We are transforming the object of key value pairs,
      into array of burger ingredients where value of that 
      object is important for me to decide how many ingredients
      I need and key is imp for type of Ingredient
      */
    // its an array of arrays
    const transforedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        // length for Array is the amount of given ingredient
        // length of array matters not what the thing is
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey} />;
        });
    });

    console.log(transforedIngredients);

    return(
        <div className={classes.Burger}>
        {/* the type below is used for prop-types validation 
        in BurgerIngredient */}
        <BurgerIngredient type="bread-top" />
        {transforedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
