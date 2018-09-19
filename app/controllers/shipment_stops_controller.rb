class ShipmentStopsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def update
    @shipment_stop = ShipmentStop.find(params[:id])
    @shipment_stop.update(shipment_stop_params)
    render json: @shipment_stop
  end

  private

  def shipment_stop_params
    params.require(:shipment_stop).permit(:office_id, :location_id, :driver_id, :stop_start, :stop_start_time, :stop_end, :stop_end_time, :stop_status, :stop_arrival, :stop_arrival_time, :stop_departure, :stop_departure_time, :stop_notes, :vehicle_id, :trailer_id)
  end
end
