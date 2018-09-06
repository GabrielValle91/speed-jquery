class CreateShipmentStops < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_stops do |t|
      t.belongs_to :location
      t.belongs_to :driver
      t.belongs_to :office
      t.belongs_to :shipment
      t.integer :stop_number
      t.datetime :stop_start
      t.datetime :stop_end
      t.string :stop_status
      t.datetime :stop_arrival
      t.datetime :stop_departure
      t.text :stop_notes
      t.belongs_to :vehicle
      t.belongs_to :trailer
      t.timestamps
    end
  end
end
