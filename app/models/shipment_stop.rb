class ShipmentStop < ApplicationRecord
  validates :stop_number, :stop_start, :stop_end, :stop_status, presence: true
  belongs_to :shipment
  belongs_to :location, optional: true
  belongs_to :driver, optional: true
  belongs_to :vehicle, optional: true
  belongs_to :trailer, optional: true
  belongs_to :office
  belongs_to :contact, optional: true
  has_many :shipment_stop_items
  STOPSTATUS = ["Open", "Dispatched", "Completed"]
end
