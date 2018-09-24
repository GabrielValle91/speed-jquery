class Shipment < ApplicationRecord
  validates :invoice_date, :shipment_status, presence: true
  belongs_to :client, optional: true
  belongs_to :office, optional: true
  has_one :shipment_tariff
  has_one :tariff, through: :shipment_tariff
  has_many :shipment_stops
  has_many :drivers, through: :shipment_stops
  has_many :locations, through: :shipment_stops
  has_many :shipment_stop_items, through: :shipment_stops
  has_many :shipment_stop_accessorials, through: :shipment_stops
  has_many :shipment_invoices
  has_many :shipment_charges
  has_many :shipment_costs

  SHIPMENTSTATUS ||= ["Open", "Completed", "Ready for Invoice"]

  def tariff_id=(tariff_id_value)
    if self.shipment_tariff
      self.shipment_tariff.tariff_id = tariff_id_value
    else
      self.shipment_tariff = ShipmentTariff.new(shipment_id: self.id, tariff_id: tariff_id_value)
    end
    self.shipment_tariff.save
  end
end
