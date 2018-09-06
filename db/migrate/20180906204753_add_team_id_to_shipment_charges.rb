class AddTeamIdToShipmentCharges < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_charges, :team_id, :integer
  end
end
