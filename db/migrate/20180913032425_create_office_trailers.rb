class CreateOfficeTrailers < ActiveRecord::Migration[5.2]
  def change
    create_table :office_trailers do |t|
      t.belongs_to :office
      t.belongs_to :trailer
      t.timestamps
    end
  end
end
