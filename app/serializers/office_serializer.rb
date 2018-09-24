class OfficeSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :shipment_stops
end