class CreateTariffs < ActiveRecord::Migration[5.2]
  def change
    create_table :tariffs do |t|
      t.belongs_to :client
      t.string :name
      t.decimal :rate, precision: 10, scale: 2
      t.decimal :min, precision: 10, scale: 2
      t.decimal :max, precision: 10, scale: 2
      t.timestamps
    end
  end
end
