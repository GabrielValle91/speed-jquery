class AddStopNumberToShipmentCharges < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_charges, :stop_number, :integer
  end
end
