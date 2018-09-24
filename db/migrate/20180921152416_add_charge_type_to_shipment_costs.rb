class AddChargeTypeToShipmentCosts < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_costs, :charge_type, :string
  end
end
