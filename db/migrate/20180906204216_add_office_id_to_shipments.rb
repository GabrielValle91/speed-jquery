class AddOfficeIdToShipments < ActiveRecord::Migration[5.2]
  def change
    add_column :shipments, :office_id, :integer
  end
end
