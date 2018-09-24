class ShipmentCharge < ApplicationRecord
  validates :amount, :charge_date, presence: true
  belongs_to :shipment
  belongs_to :driver, optional: true
  belongs_to :team, optional: true
end
