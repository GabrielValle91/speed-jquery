class Tariff < ApplicationRecord
  validates :name, :rate, presence: true
  belongs_to :client
  has_one :shipment_tariff
end
