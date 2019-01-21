import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl
            key={ctrl.label} 
            label={ctrl.label}
            // ctrl.type is being passed back to ingredientAdded method which is Handler in BurgerBuilder.js
            // tells it what ingredient/state item to update. Handler from BurgerBuilder.js is passed by reference
            added={()=> props.ingredientAdded(ctrl.type)}
            removed={()=> props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />

      ))}
      <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      >ORDER NOW</button>
        
    </div>
);

export default buildControls;