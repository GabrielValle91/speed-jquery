class AddOfficeIdToVehcileRentals < ActiveRecord::Migration[5.2]
  def change
    add_reference :vehicle_rentals, :office, foreign_key: true
  end
end
