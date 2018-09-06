class AddTeamIdToShipmentCosts < ActiveRecord::Migration[5.2]
  def change
    add_column :shipment_costs, :team_id, :integer
  end
end
