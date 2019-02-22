import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
  egg: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
      egg: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchasableHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    /* const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount +1; 
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICE[type];
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})*/

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newIngredients[type] + 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchasableHandler(newIngredients);
  };

  removeIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newIngredients[type] - 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchasableHandler(newIngredients);
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
    this.setState({ loading: true });
    // alert("You continued!");
    const order = {
      ingredients: this.state.ingredients,
      price: parseFloat(this.state.totalPrice.toFixed(2)),
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.cancelPurchasingHandler}
        purchaseContinued={this.continuePurchasingHandler}
        totalPrice={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchasingHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.updatePurchasingHandler}
          currentPrice={this.state.totalPrice}
        />
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
