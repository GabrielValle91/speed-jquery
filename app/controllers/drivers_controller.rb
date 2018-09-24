class DriversController < ApplicationController
  before_action :user_auth
  before_action :clear_notice
  before_action :find_driver, only: [:show, :edit, :update]
  before_action :create_driver, only: [:new]

  def index
    @drivers = Driver.all
    respond_to do |format|
      format.html
      format.json {render json: @drivers}
    end
  end

  def show
    @vehicle = @driver.default_vehicle_id != "" ? @vehicle = Vehicle.find(@driver.default_vehicle_id) : ''
  end

  def new
  end
  
  def create
    @driver = Driver.new(driver_params)
    if @driver.save
      redirect_to driver_path(@driver)
    else
      flash[:notice] = @driver.errors.full_messages
      render new_driver_path
    end
  end

  def edit
  end

  def update  
    if @driver.update(driver_params)
      redirect_to driver_path(@driver)
    else
      flash[:notice] = "#{@driver.errors.full_messages}"
      redirect_to edit_driver_path(@driver)
    end
  end

  private

  def driver_params
    params.require("driver").permit(:name, :active, :employment_type, :license, :default_vehicle_id, office_ids: [])
  end
  
  def create_driver
    @driver = Driver.new
  end

  def find_driver
    @driver = Driver.find(params[:id])
  end
end
