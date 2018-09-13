class Vehicle < ApplicationRecord
  validates :vehicle_number, :vehicle_owner, :vehicle_type, presence: true
  has_many :shipment_stops
  has_many :vehicle_rentals
  has_many :office_vehicles
  has_many :vehicles, through: :office_vehicles
end
