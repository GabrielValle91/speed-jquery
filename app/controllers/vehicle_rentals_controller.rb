class VehicleRentalsController < ApplicationController
  before_action :user_auth

  def index
    @vehicle_rentals = VehicleRental.all
    render json: @vehicle_rentals
  end

  def show
    @vehicle_rental = VehicleRental.find(params[:id])
  end

  def create
    @vehicle_rental = VehicleRental.new(vehicle_rental_params)
    if @vehicle_rental.save
      @rental = {
        start_date: @vehicle_rental.start_date.strftime("%m/%d/%Y"),
        end_date: @vehicle_rental.end_date.strftime("%m/%d/%Y"),
        office_name: @vehicle_rental.office_name
      }
      render json: @rental
    else
      flash[:notice] = "#{@vehicle_rental.errors.full_messages}"
      render json: @vehicle_rental
    end
  end

  private

  def vehicle_rental_params
    params.require(:vehicle_rental).permit(:vehicle_id, :start_date, :end_date, :office_id)
  end
end
