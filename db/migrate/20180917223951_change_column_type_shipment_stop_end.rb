class ChangeColumnTypeShipmentStopEnd < ActiveRecord::Migration[5.2]
  def change
    change_column :shipment_stops, :stop_end, :date
    add_column :shipment_stops, :stop_end_time, :time
  end
end
