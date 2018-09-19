class ShipmentStopItem < ApplicationRecord
  validates :item_type, presence: true
  belongs_to :shipment_stop
end
