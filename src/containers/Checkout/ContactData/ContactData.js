import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        validMessage: [],
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        validMessage: [],
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        validMessage: [],
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        validMessage: [],
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        validMessage: [],
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const orderData = {};
    for (let formDataIdenfier in this.state.orderForm) {
      orderData[formDataIdenfier] = this.state.orderForm[
        formDataIdenfier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: +this.props.price,
      orderData: orderData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  onChangeHandler = (event, inputIdentifier) => {
    const validity = checkValidity(
      event.target.value,
      this.state.orderForm[inputIdentifier].validation
    );

    const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier],{
      value: event.target.value,
      valid: validity.isValid,
      validMessage: validity.isValid? null : validity.invalidMessage,
      touched: true
    });

    const updatedOrderForm = updatedObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    })
    let formValid = true;
    for (let formElement in updatedOrderForm) {
      formValid = updatedOrderForm[formElement].valid && formValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formValid });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            message={formElement.config.validMessage}
            onChange={event => this.onChangeHandler(event, formElement.id)}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Your personal information</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
