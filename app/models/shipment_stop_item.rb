class ShipmentStopItem < ApplicationRecord
  validates :item_type, :quantity, presence: true
  belongs_to :shipment_stop
end
