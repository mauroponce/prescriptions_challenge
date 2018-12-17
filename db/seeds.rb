require 'csv'
require 'yaml'

FormulationIngredient.delete_all
Formulation.delete_all
Ingredient.delete_all

ingredient_attrs = ['id', 'name', 'minimum_percentage',
  'maximum_percentage', 'description']
formulation_attrs = ['id', 'name']
formulation_ingredients_attrs = ['formulation_id',
  'ingredient_id', 'percentage']

# load ingredients
csv_file = File.read(Rails.root.join('lib', 'seeds', 'ingredients.csv'))
parsed_csv = CSV.parse(csv_file, :headers => true, :encoding => 'ISO-8859-1')

parsed_csv.each do |row|
  ingredient = Ingredient.new
  ingredient_attrs.each do |field|
    ingredient[field] = row[field]
  end
  # Parse string with this format, as a serialized array:
  # ["Pigmentary Regulators", "Anti-Oxidants"]
  ingredient.classes = YAML.load(row['classes'])

  ingredient.save
end

# load formulations
csv_file = File.read(Rails.root.join('lib', 'seeds', 'formulations.csv'))
parsed_csv = CSV.parse(csv_file, :headers => true, :encoding => 'ISO-8859-1')
parsed_csv.each do |row|
  formulation = Formulation.new

  formulation_attrs.each do |field|
    formulation[field] = row[field]
  end

  formulation.save
end

# load formulation_ingredients
csv_file = File.read(Rails.root.join('lib', 'seeds', 'formulation_ingredients.csv'))
parsed_csv = CSV.parse(csv_file, :headers => true, :encoding => 'ISO-8859-1')
parsed_csv.each do |row|
  formulation_ingredient = FormulationIngredient.new

  formulation_ingredients_attrs.each do |field|
    formulation_ingredient[field] = row[field]
  end

  formulation_ingredient.save
end