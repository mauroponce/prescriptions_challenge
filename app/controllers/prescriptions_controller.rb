class PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show, :update, :destroy]

  # POST /prescriptions
  def create
    @prescription = Prescription.new(prescription_params)

    if @prescription.save
      render json: @prescription, status: :created, location: @prescription
    else
      render json: @prescription.errors, status: :unprocessable_entity
    end
  end

  # GET /prescriptions/suggestions
  def suggestions
    data = [
      {
        title: 'Ingredients',
        items: [
          {
            id: 1,
            name: 'Allantoin',
            minimum: 1,
            maximum: 2,
            description: 'Some Allantoin'
          },
          {
            id: 2,
            name: 'Aloe',
            minimum: 1,
            maximum: 2,
            description: 'Some Aloe'
          },
          {
            id: 9,
            name: 'Caffeine',
            minimum: 0.5,
            maximum: 1.5,
            description: 'Some coffee'
          },
        ]
      },
      {
        title: 'Formulations',
        items: [
          {
            id: 3,
            name: 'A Crema 1',
            ingredient_ids: [2, 9]
          },
          {
            id: 4,
            name: 'Crema 2',
            ingredient_ids: [1, 2]
          }
        ]
      }
    ];

    render json: data
  end

  private

    # Only allow a trusted parameter "white list" through.
    def prescription_params
      params.require(:prescription).permit(:patient_name, :address, :dob)
    end
end
