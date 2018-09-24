class AddTeamIdToShipmentInvoices < ActiveRecord::Migration[5.2]
  def change
    add_reference :shipment_invoices, :team, foreign_key: true
    remove_column :shipment_invoices, :team_id_id
  end
end
