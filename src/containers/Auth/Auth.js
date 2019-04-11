import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        validMessage: [],
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        validMessage: [],
        touched: false,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    let invalidMessage = [];
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
      if (!isValid) {
        invalidMessage.push('is required');
      }
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      if (!isValid) {
        invalidMessage.push('minimum length is ' + rules.minLength);
      }
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
      if (!isValid) {
        invalidMessage.push('maximum length is ' + rules.minLength);
      }
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        invalidMessage.push('invalid e-mail ');
      }
    }

    return { isValid: isValid, invalidMessage: invalidMessage.join(', ') };
  };

  inputChangeHandler = (event, controlName) => {
    const validity = this.checkValidity(
      event.target.value,
      this.state.controls[controlName].validation
    );

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        touched: true,
        validMessage: validity.invalidMessage,
        valid: validity.isValid,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          message={formElement.config.validMessage}
          onChange={(event) => this.inputChangeHandler(event, formElement.id)}
        />
      );
    });
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
