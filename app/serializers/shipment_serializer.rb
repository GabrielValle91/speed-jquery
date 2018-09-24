class ShipmentSerializer < ActiveModel::Serializer
  attributes :id, :reference, :client, :shipment_status, :shipment_status, :dispatch_notes, :invoice_date
  belongs_to :client
  has_many :shipment_stops
  has_many :drivers, through: :shipment_stops
  def client
    ClientSerializer.new(object.client).attributes
  end
end