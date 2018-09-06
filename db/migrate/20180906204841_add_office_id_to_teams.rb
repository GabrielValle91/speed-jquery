class AddOfficeIdToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :office_id, :integer
  end
end
