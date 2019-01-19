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
        {controls.map(ctrl =>(
            <BuildControl
            key={ctrl.label} 
            label={ctrl.label}
            // ctrl.type is being passed back to ingredientAdded method which is Handler in BurgerBuilder.js
            // tells it what ingredient/state item to update
            added={()=> props.ingredientAdded(ctrl.type)}
            />
      ))}
        
    </div>
);

export default buildControls;