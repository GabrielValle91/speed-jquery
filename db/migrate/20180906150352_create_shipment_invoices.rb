class CreateShipmentInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_invoices do |t|
      t.belongs_to :shipment
      t.string :charge_type
      t.decimal :quantity, precision: 5, scale: 2
      t.decimal :revenue, precision: 10, scale: 2
      t.boolean :exported
      t.belongs_to :team_id
      t.timestamps
    end
  end
end
