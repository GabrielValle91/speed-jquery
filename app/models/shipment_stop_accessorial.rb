class ShipmentStopAccessorial < ApplicationRecord
  validates :accessorial_type, :quantity, presence: true
  belongs_to :shipment_stop
end
