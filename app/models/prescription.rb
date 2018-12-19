class Prescription < ApplicationRecord
  has_many :prescription_ingredients
  has_many :ingredients, through: :prescription_ingredients
end
