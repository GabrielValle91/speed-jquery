require 'pry'
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

  scope :today_shipments, -> { joins(:shipment_stops).where('shipment_stops.stop_start = ? Or shipment_stops.stop_end = ?', Date.today, Date.today)}

  scope :unassigned_shipments, -> { joins(:shipment_stops).where('shipment_stops.driver_id is null')}

  def self.assigned_shipments(date_value)
    shipments = []
    self.all.each do |shipment|
      shipment.shipment_stops.each do |shipment_stop|
        if (shipment_stop.stop_start.strftime("%m/%d/%Y") == date_value || shipment_stop.stop_end.strftime("%m/%d/%Y") == date_value) && (shipment_stop.driver_id)
          shipments << shipment
        end
      end
    end
    shipments.uniq!
    return shipments.sort{|x,y| x.id <=> y.id}
  end

  def tariff_id=(tariff_id_value)
    if self.shipment_tariff
      self.shipment_tariff.tariff_id = tariff_id_value
    else
      self.shipment_tariff = ShipmentTariff.new(shipment_id: self.id, tariff_id: tariff_id_value)
    end
    self.shipment_tariff.save
  end
end
