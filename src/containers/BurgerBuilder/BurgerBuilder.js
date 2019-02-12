import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    },
    totalPrice: 4
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
  };

  removeIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newIngredients[type] - 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          currentPrice={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
