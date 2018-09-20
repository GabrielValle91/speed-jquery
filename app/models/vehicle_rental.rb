class VehicleRental < ApplicationRecord
  belongs_to :vehicle
  belongs_to :office

  def office_name
    self.office.name
  end
end
