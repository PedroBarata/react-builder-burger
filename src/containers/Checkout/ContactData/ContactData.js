import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
      console.log(this.props);
      
    this.setState({ loading: true });
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price,
      customer: {
        name: "Pedro",
        email: "teste@mail.com",
        address: {
          street: "testStreet",
          number: "12345",
          country: "Brasil"
        }
      },
      deliveryMethod: "cheapest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.replace("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Your personal information</h4>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
