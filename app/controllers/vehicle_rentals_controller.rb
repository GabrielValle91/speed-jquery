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
      render json: @vehicle_rental
    else
      flash[:notice] = "#{@vehicle_rental.errors.full_messages}"
      render json: @vehicle_rental
    end
  end

  private

  def vehicle_rental_params
    params.require(:vehicle_rental).permit(:vehicle_id, :start_date, :end_date)
  end
end
