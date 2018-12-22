import React from 'react';

const SelectedIngredients = (props) => {
  if(!props.ingredients.length) {
    return <h3 className="text-muted text-center my-5">No ingredients yet</h3>
  }

  const listItems = props.ingredients.map(ingredient => {
    return (
      <li key={ingredient.id} className="list-group-item">
        <div className="row">
          <div className="col-7">
            <h6>{ingredient.name}</h6>
            <small className="text-muted">{ingredient.description}</small>
          </div>
          <div className="col-5">
            <input type="number" className="form-control"
              step="0.01" min={ingredient.minimum_percentage}
              max={ingredient.maximum_percentage}
              value={ingredient.percentage}
              onChange={(e) => props.onPercentageChange(ingredient, e)}
            />
            <p>
              min: {ingredient.minimum_percentage},
              max: {ingredient.maximum_percentage}
            </p>
            <button
              onClick={() => props.removeIngredient(ingredient)}
              className="btn btn-link">remove ingredient
            </button>
          </div>
        </div>
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