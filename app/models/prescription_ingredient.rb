class PrescriptionIngredient < ApplicationRecord
  belongs_to :prescription
  belongs_to :ingredient

  validates :ingredient, presence: true
  validates :prescription, presence: true
  validates :percentage, presence: true, numericality: true
end
