import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
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
          required: true
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

  checkValidity = (value, rules) => {
    let isValid = true;
    let invalidMessage = [];
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
      invalidMessage.push("Is required");
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      invalidMessage.push("minimum length is " + rules.minLength);
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
      invalidMessage.push("maximum length is " + rules.minLength);
    }

    return { isValid: isValid, invalidMessage: invalidMessage.join(", ") };
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
      orderData: orderData
    };

    this.props.onOrderBurger(order);
  };

  onChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    const validity = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.valid = validity.isValid;
    updatedFormElement.validMessage = validity.invalidMessage;
    if (updatedFormElement.valid) {
      updatedFormElement.validMessage = null;
    }
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
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
    loading: state.order.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
