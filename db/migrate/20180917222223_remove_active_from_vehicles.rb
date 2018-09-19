class RemoveActiveFromVehicles < ActiveRecord::Migration[5.2]
  def change
    remove_column :vehicles, :active
  end
end
