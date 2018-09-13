module VehicleRentalsHelper
  def beginning_date(vehicle_rental)
    vehicle_rental.start_date.strftime("%m/%d/%Y")
  end
  def ending_date(vehicle_rental)
    vehicle_rental.end_date.strftime("%m/%d/%Y")
  end
end