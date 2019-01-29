import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementCofig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliverMethod: {
                elementType: 'select',
                elementCofig: {
                    options: [
                        {value: 'astest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'}
                ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        // stops the form to send the request and reload the page
        event.preventDefault();
                // alert('You continue!');
        this.setState({loading: true});
        const formData = {};
        // creating object like:
        // name: value
        // email: value etc
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = 
                this.state.orderForm[formElementIdentifier].value
        }


        const order = {
            ingredients: this.props.ingredients,
            // for real app you would re-calculate the price on the
            // server. as the user might change it on front end and 
            // submit!
            price: this.props.price,
            orderData: formData

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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required){
            // if value is not empty then isValid is true
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // doing deep cloning/copy
        const updatedFormElement= {
            ... updatedOrderForm[inputIdentifier]
        } 
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            
            {formElementsArray.map(formElement => (
                <Input
                 key={formElement.id}
                 elementType={formElement.config.elementType}
                 elementCofig= {formElement.config.elementCofig}
                 value= {formElement.config.value}
                 changed={(event)=> this.inputChangedHandler(event, formElement.id)}
                 />
            ))}
            
            <Button btnType="Success">ORDER</Button>
        </form>
        );

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