class CreateShipmentCosts < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_costs do |t|
      t.belongs_to :shipment
      t.belongs_to :driver
      t.decimal :amount, precision: 10, scale: 2
      t.date :charge_date
      t.timestamps
    end
  end
end
