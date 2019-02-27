import React from 'react';
import classes from './Order.css';
const order = (props) => {
    const ingredients = [];

    for(let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }

    const ingredientsOutuput = ingredients.map(ig => {
        return (
        <span
        style={{
            textTransform: 'capitalize',
            border: '1px solid #ccc',
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px'
        }}
        key={ig.name}>
        {ig.name} ({ig.amount})
        </span>
        )
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutuput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    )
}

export default order;