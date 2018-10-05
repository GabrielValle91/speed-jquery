class DropStopEndFromShipmentStops < ActiveRecord::Migration[5.2]
  def change
    def change
      remove_column :shipment_stops, :stop_end
    end
  end
end
