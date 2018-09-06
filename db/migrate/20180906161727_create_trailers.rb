class CreateTrailers < ActiveRecord::Migration[5.2]
  def change
    create_table :trailers do |t|
      t.string :trailer_number
      t.string :trailer_owner
      t.string :trailer_owner_number
      t.boolean :active
      t.string :trailer_type
      t.timestamps
    end
  end
end
