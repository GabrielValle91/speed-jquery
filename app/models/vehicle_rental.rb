class VehicleRental < ApplicationRecord
  belongs_to :vehicle
  belongs_to :office
end
