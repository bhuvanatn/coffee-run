class SessionController < ApplicationController
  def new
  end

  def create
    user = User.find_by :email => params[:email]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      #log em in
      redirect_to root_path
    else
      flash[:error] = "Oops"
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

 def current_user
   @current_user = User.find_by :id => session[:user_id] if session[:user_id].present?
   render :json => @current_user.as_json(:methods => :type)
 end
end
