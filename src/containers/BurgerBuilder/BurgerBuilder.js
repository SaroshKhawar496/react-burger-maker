import React, {Component} from 'react'
import Aux from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}
class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         ...
    //     }
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false

    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            // this is the amount of given ingredient
            return ingredients[igKey]
        })
        .reduce((sum, el)=>{
            //sum is the final result at end
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});

    
    }
    addIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = ()=> {
        this.setState({purchasing:true})
    }

    puchaseCancelHandler = () => {
        // to close the modal and cancel the purchase
        this.setState({purchasing:false})
    }
    
    puchaseContinueHandler = () =>{
        // alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            // for real app you would re-calculate the price on the
            // server. as the user might change it on front end and 
            // submit!
            price: this.state.totalPrice,
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
                console.log(response);
            }
        ).catch((error)=>{
            console.log(error);
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad: true, meat: false ...}

        return(

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}   >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.puchaseCancelHandler}
                        purchaseContinued={this.puchaseContinueHandler}
                        />
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                />
            </Aux>
            
        );
    }
}

export default BurgerBuilder