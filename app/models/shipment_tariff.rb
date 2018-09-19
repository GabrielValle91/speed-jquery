class ShipmentTariff < ApplicationRecord
  belongs_to :shipment
  belongs_to :tariff, optional: true
end