class Driver < ApplicationRecord
  validates :name, :employment_type, :license, presence: true
  validates :name, uniqueness: true
  has_many :shipment_charges
  has_many :shipment_costs
  has_many :shipment_stops
  has_many :shipments, through: :shipment_stops
  has_many :office_drivers
  has_many :offices, through: :office_drivers
  EMPLOYTYPES = ["Employee", "Owner-Op", "3rd Party"]
  LICENSES = ["Class A", "Class C"]
end
