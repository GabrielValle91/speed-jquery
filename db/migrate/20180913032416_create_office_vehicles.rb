class CreateOfficeVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :office_vehicles do |t|
      t.belongs_to :office
      t.belongs_to :vehicle
      t.timestamps
    end
  end
end
