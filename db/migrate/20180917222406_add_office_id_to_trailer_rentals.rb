class AddOfficeIdToTrailerRentals < ActiveRecord::Migration[5.2]
  def change
    add_reference :trailer_rentals, :office, foreign_key: true
  end
end
