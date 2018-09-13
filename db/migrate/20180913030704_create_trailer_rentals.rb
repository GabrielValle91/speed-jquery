class CreateTrailerRentals < ActiveRecord::Migration[5.2]
  def change
    create_table :trailer_rentals do |t|
      t.belongs_to :trailer
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
