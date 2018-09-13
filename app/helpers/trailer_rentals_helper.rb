module TrailerRentalsHelper
  def beginning_date(trailer_rental)
    trailer_rental.start_date.strftime("%m/%d/%Y")
  end
  def ending_date(trailer_rental)
    trailer_rental.end_date.strftime("%m/%d/%Y")
  end
end