class LocationsController < ApplicationController
  before_action :user_auth
  before_action :clear_notice
  before_action :find_location, only: [:show, :edit, :update]
  before_action :create_location, only: [:new]

  def index
    @locations = Location.all
  end

  def show
    location_details = @location.address1.split(" ")
    @location_address_details = location_details.join("+")
    location_details = @location.city.split(" ")
    @location_city_details = @location.city
    if location_details.length > 1
      @location_city_details = location_details.join("+")
    end
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @location}
    end
  end

  def new
  end
  
  def create
    @location = Location.new(location_params)
    if @location.save
      redirect_to location_path(@location)
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
