class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :logged_in?, :current_user, :clear_notice, :user_auth

  def clear_notice
    flash[:notice] = nil
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_auth
    if !logged_in?
      redirect_to login_url
    end
  end
end
