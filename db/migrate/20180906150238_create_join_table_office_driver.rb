class CreateJoinTableOfficeDriver < ActiveRecord::Migration[5.2]
  def change
    create_table :office_drivers do |t|
      t.belongs_to :office
      t.belongs_to :driver
      t.timestamps
    end
  end
end
