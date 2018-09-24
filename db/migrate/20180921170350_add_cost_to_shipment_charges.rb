class AddCostToShipmentCharges < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_charges, :cost, :decimal, precision: 10, scale: 2
  end
end
