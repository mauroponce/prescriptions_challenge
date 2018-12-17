class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.float :minimum_percentage
      t.float :maximum_percentage
      t.string :description
      t.text :classes
      t.timestamps
    end
  end
end
