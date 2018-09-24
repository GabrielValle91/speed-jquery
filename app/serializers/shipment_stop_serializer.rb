class ShipmentStopSerializer < ActiveModel::Serializer
  attributes :id, :shipment_id, :stop_number, :stop_start, :stop_end, :stop_status, :stop_arrival, :stop_departure, :stop_notes, :vehicle, :trailer, :stop_start_time, :stop_end_time, :stop_arrival_time, :stop_departure_time, :driver, :location, :office
  belongs_to :shipment
  belongs_to :driver
  belongs_to :location
  belongs_to :office
end