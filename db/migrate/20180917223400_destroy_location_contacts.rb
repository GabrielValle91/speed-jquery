class DestroyLocationContacts < ActiveRecord::Migration[5.2]
  def change
    drop_table :location_contacts
  end
end
