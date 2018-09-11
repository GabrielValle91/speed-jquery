class TariffsController < ApplicationController
  before_action :user_auth

  def index
    @tariffs = Tariff.all
    render json: @tariffs
  end

  def show
    @tariff = Tariff.find(params[:id])
  end

  def create
    @tariff = Tariff.new(tariff_params)
    if @tariff.save
      render json: @tariff
    else
      flash[:notice] = "#{@tariff.errors.full_messages}"
      render json: @tariff
    end
  end

  private

  def tariff_params
    params.require(:tariff).permit(:name, :rate, :min, :max, :client_id)
  end

  def user_auth
    if !logged_in?
      redirect_to login_url
    end
  end
end
