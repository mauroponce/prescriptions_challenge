import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import IngredientsAutosuggest from './IngredientsAutosuggest';
import { API } from '../utils/api';
import SelectedIngredients from './SelectedIngredients';

class PrescriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      day: null,
      selectedIngredients: [],
      createdPrescriptionId: null
    };

    this.handleIngredientsSelected = this.handleIngredientsSelected.bind(this);
    this.handleRemoveSelectedIngredient = this.handleRemoveSelectedIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formattedDate() {
    debugger
  }

  handleSubmit(e) {
    e.preventDefault();
    // build params object
    const params = new FormData(e.target);
    // todo, format date and add with name prescription[dob]
    //params.append
    debugger
    API.createPrescription(params)
      .then(res => {
        this.setState({ createdPrescriptionId: res.data.id })
      });
  }

  handleIngredientsSelected(newIngredients, isFormula) {
    let selectedIngredients = [];
    if (isFormula) {
      // Replace current ingredients with new formula ingredients
      selectedIngredients = newIngredients
    } else {
      // Add new new ingredients and remove duplicated
      const currentIngredients = this.state.selectedIngredients;
      selectedIngredients = currentIngredients
        .concat(newIngredients.filter((item) => {
          return currentIngredients.indexOf(item) < 0;
        }));
    }

    this.setState({ selectedIngredients });
  }

  handleRemoveSelectedIngredient(ingredient) {
    const selectedIngredients = this.state.selectedIngredients
      .filter((item) => item.id !== ingredient.id);
    this.setState({ selectedIngredients });
  }

  render() {
    const { createdPrescriptionId, selectedIngredients } = this.state;
    if (createdPrescriptionId) {
      return <Redirect to={`/prescriptions/${createdPrescriptionId}`} />
    }

    return (
      <form className='prescription-form' onSubmit={this.handleSubmit} >
        <h2>New Prescription</h2>
        <div className="form-group">
          <label>Patient Name</label>
          <input type="text" className="form-control"
            name="prescription[patient_name]"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control"
            name="prescription[address]"
          />
        </div>

        <div className="form-group">
          <label>Date Of Birth</label>
          <div className="row">
            <div className="col">
              <MonthPicker
                defaultValue={'Month'} classes={'form-control'}
                onChange={(month) => {
                  this.setState({ month });
                }}
              />
            </div>
            <div className="col">
              <DayPicker
                defaultValue={'Day'} classes={'form-control'}
                onChange={(day) => {
                  this.setState({ day });
                }}
              />
            </div>
            <div className="col">
              <YearPicker
                defaultValue={'Year'} classes={'form-control'}
                onChange={(year) => {
                  this.setState({ year });
                }}
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="form-group">
          <label>Ingredient of Formulation</label>
          <IngredientsAutosuggest
            onIngredientsSelected={this.handleIngredientsSelected}
            placeholder="Type and ingredient or a formulation"
          />
        </div>
        <SelectedIngredients
          ingredients={selectedIngredients}
          removeIngredient={this.handleRemoveSelectedIngredient}
        />
        <hr/>
        <button type="submit" className="btn btn-lg btn-primary btn-block">Save Prescription</button>
      </form>
    );
  }
}

export default PrescriptionForm;