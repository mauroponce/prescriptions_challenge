class PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show]

  # POST /prescriptions
  def create
    @prescription = Prescription.new(prescription_params)

    if @prescription.save
      ingredients = params[:ingredients] || []
      params[:ingredients].each do |ingredient_id, percentage|
        PrescriptionIngredient.create(
          prescription: @prescription,
          ingredient_id: ingredient_id,
          percentage: percentage
        )
      end
      render json: @prescription, status: :created
    else
      render json: @prescription.errors, status: :unprocessable_entity
    end
  end

  # GET /prescriptions/id
  def show
    data = {
      id: @prescription.id,
      patient_name: @prescription.patient_name,
      address: @prescription.address,
      dob: @prescription.dob,
      ingredients: @prescription.prescription_ingredients.map do |presc_ing|
        ing = presc_ing.ingredient
        {
          id: ing.id,
          name: ing.name,
          description: ing.description,
          percentage: presc_ing.percentage
        }
      end
    }
    render json: data
  end

  # GET /prescriptions/suggestions
  def suggestions
    data = [
      {
        title: 'Ingredients',
        items: Ingredient.all.map do |ingredient|
          {
            id: ingredient.id,
            name: ingredient.name,
            minimum_percentage: ingredient.minimum_percentage.round(2),
            maximum_percentage: ingredient.maximum_percentage.round(2),
            description: ingredient.description
          }
        end
      },
      {
        title: 'Formulations',
        items: Formulation.all.map do |formulation|
          {
            id: formulation.id,
            name: formulation.name,
            ingredient_ids: formulation.ingredient_ids
          }
        end
      }
    ];

    render json: data
  end

  private

    def set_prescription
      @prescription = Prescription.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def prescription_params
      params.require(:prescription).permit(:patient_name, :address, :dob)
    end
end
