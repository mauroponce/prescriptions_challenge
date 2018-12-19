import React from 'react';

const SelectedIngredients = (props) => {
  // TODO: display minimum_percentage as default when it's not a formula.
  if(!props.ingredients.length) {
    return <h3 className="text-muted">No ingredients yet</h3>
  }

  const listItems = props.ingredients.map(ingredient => {
    return (
      <li key={ingredient.id} className="list-group-item">
        <h6>{ingredient.name}</h6>
        <small className="text-muted">{ingredient.description}</small>
      </li>
    );
  });

  return (
    <ul className="list-group">
      {listItems}
    </ul>
  );
}

export default SelectedIngredients;