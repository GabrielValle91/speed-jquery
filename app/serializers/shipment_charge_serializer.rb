class ShipmentChargeSerializer < ActiveModel::Serializer
  attributes :id, :driver_id, :amount, :charge_date, :charge_type, :stop_number, :cost
end