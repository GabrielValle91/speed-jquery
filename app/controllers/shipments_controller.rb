class ShipmentsController < ApplicationController
  before_action :user_auth
  before_action :clear_notice
  before_action :make_shipment, only: [:new]
  before_action :find_shipment, only: [:show, :edit, :update]
  protect_from_forgery except: :new_stop

  def index
    @shipments = Shipment.all
  end

  def show
    
  end

  def new
    @shipment.invoice_date = Date.today
    @shipment.shipment_status = "Open"
    @shipment.save
    shipment_stop = ShipmentStop.new(shipment_id: @shipment.id, office_id: current_office.id, stop_number: 1, stop_start: Date.today, stop_end: Date.today, stop_status: "Open")
    shipment_stop.save
    redirect_to edit_shipment_path(@shipment)
  end

  def create

  end

  def edit
    # raise @shipment.inspect
    @shipment.office_id = current_user.offices.first.id
    if @shipment.shipment_stops.size == 0
      shipment_stop = ShipmentStop.new
      shipment_stop.stop_number = 1
      shipment_stop.stop_start = Date.today
      # shipment_stop.stop_start_time = 08:00
      shipment_stop.stop_end = Date.today
      # shipment_stop.stop_end_time = 17:00
      shipment_stop.stop_status = "Open"
      shipment_stop.office_id = current_user.offices.first.id
      shipment_stop.shipment_id = @shipment.id
      shipment_stop.save
    end
    @shipment_stops = @shipment.shipment_stops.sort {|x,y| x.stop_number <=> y.stop_number }
    @shipment_item_count = 0
    @shipment_stops.each do |stop|
      stop.shipment_stop_items.each do |item|
        @shipment_item_count += item.quantity
      end
    end
    @invoice_types = ["freight", "fuel", "special", "inside", "liftgate", "2Man", "hazmat", "residential", "debris", "detention", "attempt", "after hours", "extra stop", "trailer", "trailer drop"]
    # @clients = []
    # current_user.offices.each do |office|
    #   office.clients.each do |client|
    #     @clients << client.name
    #   end
    # end
  end

  def update
    @shipment.update(shipment_params)
    render json: @shipment
  end

  def new_stop
    @shipment = Shipment.find(params[:shipment_id])
    @shipment_stop = ShipmentStop.new()
    @shipment_stop.office_id = current_office.id
    @shipment_stop.shipment_id = @shipment.id
    @shipment_stop.stop_status = "Open"
    @shipment_stop.stop_number = @shipment.shipment_stops.last.stop_number + 1
    @shipment_stop.stop_start = Date.today
    @shipment_stop.stop_end = Date.today
    @shipment_stop.save
    respond_to do |format|
      format.js
    end
  end

  private

  def make_shipment
    @shipment = Shipment.new
  end

  def find_shipment
    @shipment = Shipment.find(params[:id])
  end

  def shipment_params
    params.require(:shipment).permit(:client_id, :reference, :invoice_date, :shipment_status, :dispatch_notes, :office_id, :tariff_id)
  end
end
