class DispatchController < ApplicationController
  before_action :user_auth
  def index
    @drivers = current_office.drivers
    # @shipment = Shipment.new
  end

  def assignedshipments
    date = Time.strptime(params[:date], "%m-%d-%Y")
    @assigned_shipments = current_office.shipments.assigned_shipments(date.strftime("%m/%d/%Y"))
    render json: @assigned_shipments
  end

  def unassignedshipments
    @unassigned_shipments = current_office.shipments.unassigned_shipments.distinct
    render json: @unassigned_shipments
  end
end