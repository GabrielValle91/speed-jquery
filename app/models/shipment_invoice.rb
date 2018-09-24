class ShipmentInvoice < ApplicationRecord
  validates :charge_type, :quantity, :revenue, presence: true
  belongs_to :shipment
  belongs_to :team, optional: true
end
