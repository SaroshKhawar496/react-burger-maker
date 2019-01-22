import React from 'react'
import classes from './Button.css'

const button = (props) =>(
    <button
    // Button class is default, but props.btnType will 
    // be conditionally styled
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    >{props.children}
    </button>

)

export default button;