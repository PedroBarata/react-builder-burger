import React from 'react';
import classes from './Order.css';
const order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Price: <strong>$Price</strong></p>
        </div>
    )
}

export default order;