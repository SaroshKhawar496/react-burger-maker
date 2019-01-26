import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          
          {/* treat as a prefix standard, for /checkout
          both BurgerBuilder and Checkout will be loaded */}
          <Switch>  
            <Route path="/checkout" component={Checkout} />  
            <Route path="/orders" component={Orders} />             
            <Route path="/" component={BurgerBuilder} />   
        
          </Switch>

        </Layout>

      </div>
    );
  }
}

export default App;
