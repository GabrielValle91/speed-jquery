class AddChargeTypeToShipmentCharges < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_charges, :charge_type, :string
  end
end
