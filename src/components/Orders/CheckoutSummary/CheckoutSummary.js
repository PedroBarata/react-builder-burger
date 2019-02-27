import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope this tastes well!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;
