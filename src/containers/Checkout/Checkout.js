import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.css";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //   Nome da propriedade, sendo adicionado ao objeto "ingrediente", na qual é igual ao valor
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
      console.log(ingredients);
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continued={this.checkoutContinued}
          cancelled={this.checkoutCancelled}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
