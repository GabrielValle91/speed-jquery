class CreateLocationNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :location_notes do |t|
      t.belongs_to :location
      t.string :note
      t.timestamps
    end
  end
end
