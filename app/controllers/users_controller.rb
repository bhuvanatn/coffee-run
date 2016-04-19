class UsersController < ApplicationController
   before_action :authorise, :only => [:index]
  def new
    @user = User.new
  end

  def show
    @user = @current_user
  end

  def edit
    @user = @current_user
  end

  def update
    user = @current_user
    user.update user_params
    redirect_to root_path
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new user_params

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def stores
    @stores = User.where :type => "Store"
    render :json => @stores
  end

  def store
    @store = User.find params[:id]
    render :json => @store
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :image, :type)
  end
  def authorise
  redirect_to root_path unless (@current_user.present?)
  end
end
