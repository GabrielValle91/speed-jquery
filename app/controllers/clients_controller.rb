class ClientsController < ApplicationController
  before_action :user_auth
  before_action :make_client, only: [:new]
  before_action :find_client, only: [:show, :edit, :update]
  before_action :clear_notice

  def index
    @clients = Client.all
  end

  def show
    respond_to do |format|
      format.html
      format.json {render json: @client}
    end
  end

  def new
    
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      redirect_to edit_client_path(@client)
    else
      flash[:notice] = @client.errors.full_messages
      render new_client_path
    end
  end

  def edit
    @tariff = Tariff.new
  end

  def update
    if @client.update(client_params)
      redirect_to client_path(@client)
    else
      flash[:notice] = "#{@client.errors.full_messages}"
      redirect_to edit_client_path(@client)
    end
  end

  private

  def make_client
    @client = Client.new
  end

  def find_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :qb_name, :billing_name, :billing_address1, :billing_address2, :billing_city, :billing_state, :billing_zip, :billing_email, :net_terms, :active, office_ids: [])
  end
end
