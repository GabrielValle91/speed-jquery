class TariffSerializer < ActiveModel::Serializer
  attributes :id, :name, :rate, :min, :max
  belongs_to :client
end