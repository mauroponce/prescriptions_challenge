class FormulationIngredient < ApplicationRecord
  belongs_to :formulation
  belongs_to :ingredient

  # TODO: Add validations
end
