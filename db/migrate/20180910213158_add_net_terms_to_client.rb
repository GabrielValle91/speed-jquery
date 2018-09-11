class AddNetTermsToClient < ActiveRecord::Migration[5.2]
  def change
    add_column :clients, :net_terms, :string
  end
end
