class ChangeColumnTypeShipmentStopArrivale < ActiveRecord::Migration[5.2]
  def change
    change_column :shipment_stops, :stop_arrival, :date
    add_column :shipment_stops, :stop_arrival_time, :time
  end
end
