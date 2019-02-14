import React, {Component} from 'react'
import Aux from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         ...
    //     }
    // }

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount () {
        // axios.get('https://react-my-burger-5762c.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // })
        // .catch(error => {
        //     this.setState({error: true})
        // });

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


    purchaseHandler = ()=> {
        this.setState({purchasing:true})
    }

    puchaseCancelHandler = () => {
        // to close the modal and cancel the purchase
        this.setState({purchasing:false})
    }
    
    puchaseContinueHandler = () =>{
        //passing the burger made in burgerBuilder to the checkout route 
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        // queryParams is now an array with propertyName=propertyValue
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render(){
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        // showing spinner while ingredients are coming from 
        // firebase.
        let burger = this.state.error ? <p> Ingredients can't be 
            loaded </p> : <Spinner />

        if (this.props.ings){
            burger = ( 
                        <Aux>
                        <Burger ingredients={this.props.ings}/>
                            <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            price={this.props.price}
                        />
                        </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.puchaseCancelHandler}
            purchaseContinued={this.puchaseContinueHandler}
            />;
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}   >
                        {orderSummary}
                </Modal>
                {burger}


            </Aux>
            
        );
    }
}
const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))