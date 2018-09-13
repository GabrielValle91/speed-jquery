class Trailer < ApplicationRecord
  validates :trailer_number, :trailer_owner, :trailer_owner_number, :trailer_type, presence: true
  has_many :shipment_stops
  has_many :trailer_rentals
  has_many :office_trailers
  has_many :offices, through: :office_trailers
end
