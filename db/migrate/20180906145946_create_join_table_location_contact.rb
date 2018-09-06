class CreateJoinTableLocationContact < ActiveRecord::Migration[5.2]
  def change
    create_table :location_contacts do |t|
      t.belongs_to :location
      t.belongs_to :contact
      t.timestamps
    end
  end
end
