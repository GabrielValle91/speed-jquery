class ChangeDefaultShipmentStatus < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :drivers,
      :default_vehicle_id,
      'Open',
    )
  end
end
