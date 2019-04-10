import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
  egg: 0.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      }
      return updatedObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngrs = updatedObject(state.ingredients, updatedIngr);
      const updatedSt = {
        ingredients: updatedIngrs,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      }
      return updatedObject(state, updatedSt);
    case actionTypes.SET_INGREDIENTS:
      return updatedObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          egg: action.ingredients.egg,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updatedObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
