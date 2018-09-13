class VehiclesController < ApplicationController
  before_action :user_auth
  before_action :make_vehicle, only: [:new]
  before_action :find_vehicle, only: [:show, :edit, :update]
  before_action :clear_notice

  def index
    @vehicles = Vehicle.all
    # @clients = [] 
    # current_user.offices.each do |office|
    #   office.clients.each do |client|
    #     @clients << client
    #   end
    # end
    # @clients.uniq!
  end

  def show
  end

  def new
    
  end

  def create
    @vehicle = Vehicle.new(vehicle_params)
    if @vehicle.save
      redirect_to edit_vehicle_path(@vehicle)
    else
      flash[:notice] = @vehicle.errors.full_messages
      render new_vehicle_path
    end
  end

  def edit
  end

  def update
    if @vehicle.update(vehicle_params)
      redirect_to vehicle_path(@vehicle)
    else
      flash[:notice] = "#{@vehicle.errors.full_messages}"
      redirect_to edit_vehicle_path(@vehicle)
    end
  end

  private

  def make_vehicle
    @vehicle = Vehicle.new
  end

  def find_vehicle
    @vehicle = Vehicle.find(params[:id])
  end

  def vehicle_params
    params.require(:vehicle).permit(:vehicle_number, :vehicle_owner, :active, :vehicle_type)
  end
end
