class TrailersController < ApplicationController
  before_action :user_auth
  before_action :make_trailer, only: [:new]
  before_action :find_trailer, only: [:show, :edit, :update]
  before_action :clear_notice

  def index
    @trailers = Trailer.all
  end

  def show
  end

  def new
    
  end

  def create
    @trailer = Trailer.new(trailer_params)
    if @trailer.save
      redirect_to edit_trailer_path(@trailer)
    else
      flash[:notice] = @trailer.errors.full_messages
      render new_trailer_path
    end
  end

  def edit
    @rental = TrailerRental.new
  end

  def update
    if @trailer.update(trailer_params)
      redirect_to trailer_path(@trailer)
    else
      flash[:notice] = "#{@trailer.errors.full_messages}"
      redirect_to edit_trailer_path(@trailer)
    end
  end

  private

  def make_trailer
    @trailer = Trailer.new
  end

  def find_trailer
    @trailer = Trailer.find(params[:id])
  end

  def trailer_params
    params.require(:trailer).permit(:trailer_number, :trailer_owner, :trailer_owner_number, :trailer_type, office_ids: [])
  end
end
