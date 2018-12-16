import React, { Component } from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import IngredientsAutosuggest from './IngredientsAutosuggest';

class PrescriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      address: null,
      year: null,
      month: null,
      day: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.patient);
  }

  handleSuggestionSelected() {
    debugger
  }

  render() {
    return (
      <form className='prescription-form'>
        <h2>New Prescription</h2>
        <div className="form-group">
          <label>Patient Name</label>
          <input type="text" className="form-control" id="patientName" />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" id="patientAddress" />
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
            onSuggestionSelected={this.handleSuggestionSelected}
            placeholder="Type and ingredient or a formulation"
          />
        </div>
        <hr/>
        <button type="submit" className="btn btn-lg btn-primary btn-block">Save Prescription</button>
      </form>
    );
  }
}

export default PrescriptionForm;