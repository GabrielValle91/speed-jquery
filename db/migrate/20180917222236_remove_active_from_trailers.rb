class RemoveActiveFromTrailers < ActiveRecord::Migration[5.2]
  def change
    remove_column :trailers, :active
  end
end
