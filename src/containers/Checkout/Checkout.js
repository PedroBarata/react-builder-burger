import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.css";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {

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
          ingredients={this.props.ings}
          continued={this.checkoutContinued}
          cancelled={this.checkoutCancelled}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);
