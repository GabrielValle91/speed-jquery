class RemoveActiveFromClients < ActiveRecord::Migration[5.2]
  def change
    remove_column :clients, :active
  end
end
