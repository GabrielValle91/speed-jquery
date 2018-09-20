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
      @rental = {
        start_date: @trailer_rental.start_date.strftime("%m/%d/%Y"),
        end_date: @trailer_rental.end_date.strftime("%m/%d/%Y"),
        office_name: @trailer_rental.office.name
      }
      render json: @rental
    else
      flash[:notice] = "#{@trailer_rental.errors.full_messages}"
      render json: @trailer_rental
    end
  end

  private

  def trailer_rental_params
    params.require(:trailer_rental).permit(:trailer_id, :start_date, :end_date, :office_id)
  end
end
