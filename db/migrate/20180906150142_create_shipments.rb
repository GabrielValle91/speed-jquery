class CreateShipments < ActiveRecord::Migration[5.2]
  def change
    create_table :shipments do |t|
      t.belongs_to :client
      t.string :reference
      t.date :invoice_date
      t.string :shipment_status
      t.text :dispatch_notes
      t.timestamps
    end
  end
end
