class Vehicle < ApplicationRecord
  validates :vehicle_number, :vehicle_owner, :vehicle_type, presence: true
  has_many :shipment_stops
end