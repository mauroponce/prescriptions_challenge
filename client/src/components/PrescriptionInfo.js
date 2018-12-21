import React, { Component } from 'react';
import { API } from '../utils/api';

class PrescriptionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescription: {
        ingredients: []
      }
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    API.getPrescription(params.prescriptionId)
      .then(res => {
        this.setState({ prescription: res.data })
      });
  }

  render() {
    const { prescription } = this.state;
    if (!prescription.ingredients.length) {
      return <h3 className="text-muted text-center">Loading...</h3>
    }
    return (
      <div className='prescription-info'>
        <h2 className='mb-3'>Prescription {prescription.id}</h2>
        <dl>
          <dt>Name</dt>
          <dd>{prescription.patient_name}</dd>

          <dt>Address</dt>
          <dd>{prescription.address}</dd>

          <dt>Date of Birth</dt>
          <dd>{prescription.dob}</dd>
        </dl>
        <hr/>
        <ul className="list-group">
          {prescription.ingredients.map(ing => {
            return (
              <li key={ing.id} className="list-group-item d-flex justify-content-between">
                <div>
                  <h6 className="my-0">{ing.name}</h6>
                  <small className="text-muted">
                    {ing.description}
                  </small>
                </div>
                <span className="text-muted">{ing.percentage}</span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default PrescriptionInfo;