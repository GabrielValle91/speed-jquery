class AddContactIdToShipmentStops < ActiveRecord::Migration[5.2]
  def change
    add_reference :shipment_stops, :contact, foreign_key: true
  end
end
