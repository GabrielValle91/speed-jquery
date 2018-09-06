class Location < ApplicationRecord
  validates :company_name, :address1, :city, :state, :zip, presence: true
  validates :company_name, uniqueness: true
end
