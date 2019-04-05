import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";


class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false   
  };

   componentDidMount() {
     this.props.onInitIngredients();
  } 

  updatePurchasableHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  updatePurchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  /* updatePurchasingHandler() {
    NÃO REFERENCIA A CLASSE, É DIFERENTE DA ARROW FUNCTION
    this.setState({ purchasing: true})
  }
 */

  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchasingHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be fetched!</p>
    ) : (
        <Spinner />
      );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchasableHandler(this.props.ings)}
            ordered={this.updatePurchasingHandler}
            currentPrice={this.props.price}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.cancelPurchasingHandler}
          purchaseContinued={this.continuePurchasingHandler}
          totalPrice={this.props.price}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchasingHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngriedient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseBurgerInit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
