class CreatePrescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :prescriptions do |t|
      t.string :patient_name
      t.string :address
      t.string :dob

      t.timestamps
    end
  end
end
