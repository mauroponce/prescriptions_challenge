import React, { Component } from 'react';
import './App.css';
import PrescriptionForm from './components/PrescriptionForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredients: []
    };

    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
  }

  handleRemoveIngredient(ingredient) {
    // remove from selectedIngredients
    const selectedIngredients = this.state.selectedIngredients
      .filter(item => item.id !== ingredient.id);
    this.setState({ selectedIngredients });
  }

  onPrescriptionSubmit(prescription) {
    /*
    tras el submit en el form, q le mando al server
    patient
    const params = {
      prescription: prescription
    }
    */
  }

  render() {
    return (
      <div className="container">
        <PrescriptionForm onSubmit={this.onPrescriptionSubmit} />
      </div>
    );
  }
}

export default App;
