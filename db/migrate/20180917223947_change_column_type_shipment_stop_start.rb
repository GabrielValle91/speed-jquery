class ChangeColumnTypeShipmentStopStart < ActiveRecord::Migration[5.2]
  def change
    change_column :shipment_stops, :stop_start, :date
    add_column :shipment_stops, :stop_start_time, :time
  end
end
