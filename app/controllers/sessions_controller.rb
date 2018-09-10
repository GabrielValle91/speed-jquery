class SessionsController < ApplicationController
  def new
  end

  def create
    if session[:user_id]
      redirect_to user_path(User.find(session[:id]))
    else
      @user = User.find_by(username: params[:username])
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        redirect_to root_url
      else
        redirect_to login_url, notice: "Incorrect username/password combination"
      end
    end
  end

  def logout
    if logged_in?
      session.clear
    end
    redirect_to root_url
  end
end