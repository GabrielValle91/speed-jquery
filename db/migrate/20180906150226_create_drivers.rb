class CreateDrivers < ActiveRecord::Migration[5.2]
  def change
    create_table :drivers do |t|
      t.string :name
      t.boolean :active
      t.string :employment_type
      t.string :license
      t.belongs_to :office
      t.string :default_vehicle_id
      t.timestamps
    end
  end
end
