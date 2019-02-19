import React from 'react';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    });

    return (
        <>
        <h3>Order Summary</h3>
        <p>Your delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
};

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired
}

export default orderSummary;