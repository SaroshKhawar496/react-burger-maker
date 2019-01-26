import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi/Auxi'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    
    // in BurgerBuilder.js, Modal wraps OrderSummary and if Modal
    // doesn't update neither does the OrderSummary
    shouldComponentUpdate(nextProps, nextState) {
        // will render it again only if the show changes
        if (nextProps.show !== this.props.show
            // adding or because modal should update when Spinner
            // is passsed ie child changed
            ||
            nextProps.children !== this.props.children) {
            return true;
        }
        return false;
    }
    componentWillUpdate() {
        console.log("Modal will update.")
    }

    render(){

        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh),',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
         </Aux>
        );
    }
}

export default Modal;