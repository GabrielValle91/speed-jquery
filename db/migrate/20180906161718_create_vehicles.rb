class CreateVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :vehicles do |t|
      t.string :vehicle_number
      t.string :vehicle_owner
      t.boolean :active
      t.string :vehicle_type
      t.timestamps
    end
  end
end
