class Ingredient < ApplicationRecord
  serialize :classes, Array

  validates :name, presence: true
  validates :description, presence: true
end
