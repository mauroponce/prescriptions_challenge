import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import classnames from 'classnames';
import IngredientsAutosuggest from './IngredientsAutosuggest';
import { API } from '../utils/api';
import SelectedIngredients from './SelectedIngredients';

const formatDate = (date) => {	// formats a JS date to 'yyyy-mm-dd'
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class PrescriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_name: '',
      address: '',
      year: null,
      month: null,
      day: null,
      errors: {},
      selectedIngredients: [],
      createdPrescriptionId: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateFieldChange = this.handleDateFieldChange.bind(this);
    this.handleIngredientsSelected = this.handleIngredientsSelected.bind(this);
    this.handleRemoveSelectedIngredient = this.handleRemoveSelectedIngredient.bind(this);
    this.handlePercentageChange = this.handlePercentageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // delete errors when input changed
    if (this.state.errors[name]) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleDateFieldChange(name, value) {
    this.setState({ [name]: value }, () => {
      const {
        errors,
        year, month, day
      } = this.state;
      if (errors['dob']) {
        const newErrors = Object.assign({}, errors);
        if (year !== null && month !== null && day !== null) {
          delete newErrors['dob'];
        }
        this.setState({
          errors: newErrors
        });
      }
    });
  }

  handlePercentageChange(ingredient, event) {
    const percentage = event.target.value;
    const selectedIngredients = this.state.selectedIngredients.map( obj => {
      if (ingredient.id !== obj.id) return obj;
      return { ...ingredient, percentage: percentage };
    });
    this.setState({ selectedIngredients });
  }

  handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    const {
      patient_name, address,
      selectedIngredients
    } = this.state;
    let { year, month, day } = this.state;

    if (patient_name === '') {
      errors.patient_name = "Valid name is required.";
    }
    if (address === '') {
      errors.address = "Valid address is required.";
    }
    if (!year || !month || !day) {
      errors.dob = "Valid date is required.";
    }
    if (!selectedIngredients.length) {
      errors.ingredients = "At least one ingredient is required."
    }

    this.setState({ errors });

    let isValid = Object.keys(errors).length === 0;
    if (isValid) {
      // parse date
      if (month.length < 2) month = '0' + (parseInt(month) + 1);
      if (day.length < 2) day = '0' + day;
      const dob = [year, month, day].join('-');

      const ingredients = this.state.selectedIngredients.map(ing => {
        return {
          id: ing.id,
          percentage: ing.percentage
        }
      });

      const params = {
        prescription: {
          patient_name: patient_name,
          address: address,
          dob: dob,
          ingredients: ingredients
        }
      };
      API.createPrescription(params)
        .then(res => {
          this.setState({ createdPrescriptionId: res.data.id })
        });
    }
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
    this.setState({ selectedIngredients }, () => {
      const {
        errors,
        selectedIngredients
      } = this.state;

      if (errors['ingredients']) {
        const newErrors = Object.assign({}, errors);
        if (selectedIngredients.length) {
          delete newErrors['ingredients'];
        }
        this.setState({
          errors: newErrors
        });
      }
    });
  }

  handleRemoveSelectedIngredient(ingredient) {
    const selectedIngredients = this.state.selectedIngredients
      .filter((item) => item.id !== ingredient.id);
    this.setState({ selectedIngredients });
  }

  render() {
    const {
      errors,
      createdPrescriptionId,
      patient_name, address,
      selectedIngredients
    } = this.state;

    if (createdPrescriptionId) {
      return <Redirect to={`/prescriptions/${createdPrescriptionId}`} />
    }

    return (
      <form className='prescription-form' onSubmit={this.handleSubmit} >
        <h2>New Prescription</h2>
        <div className="form-group">
          <label>Patient Name</label>
          <input type="text"
            className={classnames('form-control', { error: !!errors.patient_name })}
            value={patient_name}
            onChange={this.handleInputChange}
            name="patient_name"
          />
          <div className="invalid-field">{errors.patient_name}</div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text"
            className={classnames('form-control', { error: !!errors.address })}
            value={address}
            onChange={this.handleInputChange}
            name="address"
          />
          <div className="invalid-field">{errors.address}</div>
        </div>

        <div className="form-group is-invalid">
          <label>Date Of Birth</label>
          <div className="row">
            <div className="col">
              <MonthPicker
                defaultValue={'Month'}
                classes={classnames('form-control', { error: !!errors.dob })}
                onChange={(value) => this.handleDateFieldChange('month', value)}
              />
            </div>
            <div className="col">
              <DayPicker
                defaultValue={'Day'}
                classes={classnames('form-control', { error: !!errors.dob })}
                onChange={(value) => this.handleDateFieldChange('day', value)}
              />
            </div>
            <div className="col">
              <YearPicker
                defaultValue={'Year'}
                classes={classnames('form-control', { error: !!errors.dob })}
                onChange={(value) => this.handleDateFieldChange('year', value)}
              />
            </div>
          </div>
          <div className="invalid-field">{errors.dob}</div>
        </div>
        <hr/>
        <div className="form-group">
          <label>Ingredient of Formulation</label>
          <IngredientsAutosuggest
            onIngredientsSelected={this.handleIngredientsSelected}
            placeholder="Type and ingredient or a formulation"
          />
          <div className="invalid-field">{errors.ingredients}</div>
        </div>
        <SelectedIngredients
          ingredients={selectedIngredients}
          removeIngredient={this.handleRemoveSelectedIngredient}
          onPercentageChange={this.handlePercentageChange}
        />
        <hr/>
        <button type="submit" className="btn btn-lg btn-primary btn-block">Save Prescription</button>
      </form>
    );
  }
}

export default PrescriptionForm;