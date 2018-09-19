class ChangeColumnTypeShipmentStopDeparture < ActiveRecord::Migration[5.2]
  def change
    change_column :shipment_stops, :stop_departure, :date
    add_column :shipment_stops, :stop_departure_time, :time
  end
end
