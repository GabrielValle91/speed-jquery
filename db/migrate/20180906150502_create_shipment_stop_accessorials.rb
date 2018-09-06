class CreateShipmentStopAccessorials < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_stop_accessorials do |t|
      t.belongs_to :shipment_stop
      t.string :accessorial_type
      t.integer :quantity
      t.timestamps
    end
  end
end
