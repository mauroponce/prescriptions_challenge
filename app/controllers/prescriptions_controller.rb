class PrescriptionsController < ApplicationController
  before_action :set_prescription, only: [:show]

  # POST /prescriptions
  def create
    @prescription = Prescription.new(prescription_params)
    if @prescription.save
      ingredients = params[:prescription][:ingredients] || []
      ingredients.each do |ing|
        PrescriptionIngredient.create(
          prescription: @prescription,
          ingredient_id: ing[:id],
          percentage: ing[:percentage]
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
          percentage: presc_ing.percentage,
          classes: ing.classes
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
            description: ingredient.description,
            classes: ingredient.classes
          }
        end
      },
      {
        title: 'Formulations',
        items: Formulation.all.map do |formulation|
          {
            id: formulation.id,
            name: formulation.name,
            ingredients: formulation.formulation_ingredients.map do |f_ing|
              {
                id: f_ing.ingredient_id,
                percentage: f_ing.percentage
              }
            end
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
