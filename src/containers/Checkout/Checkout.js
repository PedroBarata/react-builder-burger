import React, { Component } from "react";
import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import classes from './Checkout.css';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
      egg: 1
    }
  };
  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;
