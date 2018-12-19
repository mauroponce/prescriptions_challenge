class PrescriptionIngredient < ApplicationRecord
  belongs_to :prescription
  belongs_to :ingredient
end
