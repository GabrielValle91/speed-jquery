class ChangeDefaultShipmentShipmentStatus < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :shipments,
      :shipment_status,
      "Open",
    )
  end
end
