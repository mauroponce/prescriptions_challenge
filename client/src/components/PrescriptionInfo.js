import React, { Component } from 'react';
import { API } from '../utils/api';

class PrescriptionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescription: {}
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
    return (
      <div>
        <h2>Prescription {prescription.id}</h2>
      </div>
    );
  }
}

export default PrescriptionInfo;