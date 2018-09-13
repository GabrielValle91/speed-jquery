class OfficeVehicle < ApplicationRecord
  belongs_to :office
  belongs_to :vehicle
end