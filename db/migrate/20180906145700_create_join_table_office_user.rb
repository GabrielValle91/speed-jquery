class CreateJoinTableOfficeUser < ActiveRecord::Migration[5.2]
  def change
    create_table :office_users do |t|
      t.belongs_to :office
      t.belongs_to :user
      t.timestamps
    end
  end
end
