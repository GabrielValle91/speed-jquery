class WelcomeController < ApplicationController
  
  def show
    render :show, layout: false
  end
end
