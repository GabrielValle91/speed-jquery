class Trailer < ApplicationRecord
  validates :trailer_number, :trailer_owner, :trailer_owner_number, :trailer_type, presence: true
  has_many :shipment_stops
  has_many :trailer_rentals
  has_many :office_trailers
  has_many :offices, through: :office_trailers
  TRAILERTYPES = ["32ft liftgate", "48ft dry van", "48ft flatbed", "48ft liftgate", "53ft dry van", "53ft flatbed", "53ft liftgate"]
end
