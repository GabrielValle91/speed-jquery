class ShipmentChargesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    if params[:shipment_id]
      @shipment_charges = ShipmentCharge.where('shipment_id = ? ', params[:shipment_id])
    else
      @shipment_charges = ShipmentCharge.all
    end
    respond_to do |format|
      format.html 
      format.json {render json: @shipment_charges}
    end
  end

  def create
    @shipment_charge = ShipmentCharge.create(shipment_charge_params)
    render json: @shipment_charge
  end

  def update
    @shipment_charge = ShipmentCharge.find(params[:id])
    @shipment_charge.update(shipment_charge_params)
    render json: @shipment_charge
  end

  private

  def shipment_charge_params
    params.require(:shipment_charge).permit(:shipment_id, :charge_type, :driver_id, :amount, :charge_date, :stop_number, :cost)
  end
end
