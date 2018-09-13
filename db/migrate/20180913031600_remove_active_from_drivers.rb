class RemoveActiveFromDrivers < ActiveRecord::Migration[5.2]
  def change
    remove_column :drivers, :active
  end
end
