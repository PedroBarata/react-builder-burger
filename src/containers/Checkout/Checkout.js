import React, { Component } from "react";
import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.css";
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

  componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for(let param of query.entries()) {
        //   Nome da propriedade, sendo adicionado ao objeto "ingrediente", na qual é igual ao valor
        ingredients[param[0]] = +param[1];
        console.log(ingredients);
      }
      this.setState({ingredients: ingredients});
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    alert("Continued!");
  };


  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary 
        ingredients={this.state.ingredients} 
        continued={this.checkoutContinued}
        cancelled={this.checkoutCancelled}
        />
      </div>
    );
  }
}

export default Checkout;
