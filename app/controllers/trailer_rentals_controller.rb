class TrailerRentalsController < ApplicationController
  before_action :user_auth

  def index
    @trailer_rentals = TrailerRental.all
    render json: @trailer_rentals
  end

  def show
    @trailer_rental = TrailerRental.find(params[:id])
  end

  def create
    @trailer_rental = TrailerRental.new(trailer_rental_params)
    if @trailer_rental.save
      render json: @trailer_rental
    else
      flash[:notice] = "#{@trailer_rental.errors.full_messages}"
      render json: @trailer_rental
    end
  end

  private

  def trailer_rental_params
    params.require(:trailer_rental).permit(:trailer_id, :start_date, :end_date)
  end
end
