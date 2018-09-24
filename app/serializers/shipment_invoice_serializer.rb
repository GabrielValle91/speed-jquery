class ShipmentInvoiceSerializer < ActiveModel::Serializer
  attributes :id, :charge_type, :quantity, :revenue
end