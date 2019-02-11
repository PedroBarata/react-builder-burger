import React from "react";
import classes from "./BurgerIngredient.css";
import PropTypes from 'prop-types';

const burgerIngredient = props => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom} />;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={classes.Meat} />;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese} />;
      break;
    case "salad":
      ingredient = <div className={classes.Salad} />;
      break;
    case "beacon":
      ingredient = <div className={classes.Beacon} />;
      break;
      default:
      ingredient = null;
  }
  return ingredient;
};

burgerIngredient.PropTypes = {
    type: PropTypes.string
}

export default burgerIngredient;
