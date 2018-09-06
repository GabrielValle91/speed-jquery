class CreateShipmentStopItems < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_stop_items do |t|
      t.belongs_to :shipment_stop
      t.string :item_type
      t.integer :quantity
      t.integer :weight
      t.string :description
      t.timestamps
    end
  end
end
