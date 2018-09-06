class RemoveOfficeFromDrivers < ActiveRecord::Migration[5.2]
  def change
    remove_column :drivers, :office_id
  end
end
