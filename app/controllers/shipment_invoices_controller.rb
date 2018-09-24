class ShipmentInvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    if params[:shipment_id]
      @shipment_invoices = ShipmentInvoice.where('shipment_id = ? ', params[:shipment_id])
    else
      @shipment_invoices = ShipmentInvoice.all
    end
    respond_to do |format|
      format.html 
      format.json {render json: @shipment_invoices}
    end
  end

  def create
    @shipment_invoice = ShipmentInvoice.create(shipment_invoice_params)
    render json: @shipment_invoice
  end

  def update
    @shipment_invoice = ShipmentInvoice.find(params[:id])
    @shipment_invoice.update(shipment_invoice_params)
    render json: @shipment_invoice
  end

  private

  def shipment_invoice_params
    params.require(:shipment_invoice).permit(:shipment_id, :charge_type, :quantity, :revenue)
  end
end
