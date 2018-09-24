class AddStopNumberToShipmentCosts < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_costs, :stop_number, :integer
  end
end
