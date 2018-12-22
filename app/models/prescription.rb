class Prescription < ApplicationRecord
  has_many :prescription_ingredients
  has_many :ingredients, through: :prescription_ingredients

  validates :patient_name, presence: true
  validates :address, presence: true
  validates :dob, presence: true
end
