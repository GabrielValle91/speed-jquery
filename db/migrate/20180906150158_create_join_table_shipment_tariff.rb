class CreateJoinTableShipmentTariff < ActiveRecord::Migration[5.2]
  def change
    create_table :shipment_tariffs do |t|
      t.belongs_to :shipment
      t.belongs_to :tariff
      t.timestamps
    end
  end
end
