class Team < ApplicationRecord
  validates :name, presence: true
  belongs_to :office
  has_many :shipment_invoices
  has_many :shipment_charges
  has_many :shipment_costs
end
