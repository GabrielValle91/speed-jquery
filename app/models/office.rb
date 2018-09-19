class Office < ApplicationRecord
  validates :name, :address1, :city, :state, :zip, presence: true
  has_many :office_clients
  has_many :clients, through: :office_clients
  has_many :office_users
  has_many :users, through: :office_users
  has_many :office_drivers
  has_many :drivers, through: :office_drivers
  has_many :shipment_stops
  has_many :shipments
  has_many :teams
  has_many :office_vehicles
  has_many :vehicles, through: :office_vehicles
  has_many :office_trailers
  has_many :trailers, through: :office_trailers
  has_many :trailer_rentals
  has_many :vehicle_rentals
end
