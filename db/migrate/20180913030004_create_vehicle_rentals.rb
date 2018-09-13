class CreateVehicleRentals < ActiveRecord::Migration[5.2]
  def change
    create_table :vehicle_rentals do |t|
      t.belongs_to :vehicle
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
