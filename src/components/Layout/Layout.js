import React, {Component} from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}       
        });
    }   

    render (){
        return (
            <Aux>
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            </div>
    
            <main className={classes.Content}>
                {/*App.js calls Layout and passes BurgerBuilder as children  */}
                {this.props.children}
            </main>
        </Aux>

        )
    }
}

export default Layout;