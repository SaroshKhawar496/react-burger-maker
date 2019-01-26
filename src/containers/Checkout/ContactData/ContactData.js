import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // stops the form to send the request and reload the page
        event.preventDefault();
                // alert('You continue!');
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            // for real app you would re-calculate the price on the
            // server. as the user might change it on front end and 
            // submit!
            price: this.props.price,
            customer: {
                name: 'Sarosh',
                address: {
                    street: 'test street 1',
                    zipCode: '123123',
                    country: 'Canada'
                },
                email: 'test@gmail.com'
            },
            deliverMethod: 'fastest'
        }
        // sending post request to firebase
        // for firebase, /orders will create a new node or route 
        // .json is needed
        axios.post('/orders.json',order).then(
            (response)=>{
                // console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            }
        ).catch((error)=>{
            // console.log(error);
            this.setState({loading: false});
        });
    }

    render(){
        let form = (<form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
            <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
            <input className={classes.Input} type='text' name='street' placeholder='Street'/>
            <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
    
}

export default ContactData;