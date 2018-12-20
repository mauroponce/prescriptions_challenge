import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrescriptionForm from './components/PrescriptionForm';
import PrescriptionInfo from './components/PrescriptionInfo'
import { BrowserRouter } from 'react-router-dom';

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

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path='/prescriptions/new' component={PrescriptionForm} />
            <Route exact path='/prescriptions/:prescriptionId' component={PrescriptionInfo} />

            <Route exact path='/'
              render={() => (
                <Redirect to='/prescriptions/new' />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
