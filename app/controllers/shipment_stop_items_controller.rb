class ShipmentStopItemsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @shipment_stop_item = ShipmentStopItem.create(shipment_stop_item_params)
    render json: @shipment_stop_item
  end

  def destroy
    @shipment_stop_item = ShipmentStopItem.find(params[:id])
    @shipment_stop_item.destroy
  end

  private

  def shipment_stop_item_params
    params.require(:shipment_stop_item).permit(:shipment_stop_id, :item_type, :quantity, :weight, :description)
  end
end
