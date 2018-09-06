class CreateJoinTableOfficeClient < ActiveRecord::Migration[5.2]
  def change
    create_table :office_clients do |t|
      t.belongs_to :office
      t.belongs_to :client
      t.timestamps
    end
  end
end
