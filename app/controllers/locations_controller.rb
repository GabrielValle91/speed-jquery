class LocationsController < ApplicationController
  before_action :user_auth
  before_action :clear_notice
  before_action :find_location, only: [:show, :edit, :update]
  before_action :create_location, only: [:new]

  def index
    @locations = Location.all
  end

  def show
  end

  def new
  end
  
  def create
    # raise params.inspect
    @location = Location.new(location_params)
    if @location.save
      redirect_to edit_location_path(@location)
    else
      flash[:notice] = @location.errors.full_messages
      render new_location_path
    end
  end

  def edit
  end

  def update  
    if @location.update(location_params)
      redirect_to location_path(@location)
    else
      flash[:notice] = "#{@location.errors.full_messages}"
      redirect_to edit_location_path(@location)
    end
  end

  private

  def location_params
    params.require("location").permit(:company_name, :address1, :address2, :city, :state, :zip)
  end
  
  def create_location
    @location = Location.new
  end

  def find_location
    @location = Location.find(params[:id])
  end
end
