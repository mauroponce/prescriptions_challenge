class FormulationIngredient < ApplicationRecord
  belongs_to :formulation
  belongs_to :ingredient

  validates :formulation, presence: true
  validates :ingredient, presence: true
  validates :percentage, presence: true, numericality: true
end
