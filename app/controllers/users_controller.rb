class UsersController < ApplicationController
   before_action :authorise, :only => [:index]
  def new
    @user = User.new
  end

  def show
    respond_to do |format|
      @user = @current_user
      format.html {}
      format.json { render :json => User.find(params[:id]) }
    end
  end

  def edit
    @user = @current_user
  end

  def update
    user = @current_user
    user.update user_params
    render :json => {}
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

  def customers
    @customers = User.where :type => "Customer"
    render :json => @customers
  end

  def stores_within
    @user = @current_user
    ### get the stores near the customer
    @range = 1
    @stores = Store.near([@user.latitude,@user.longitude], @range, :units => :km )
      render :json => @stores
  end

  private
  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :image,
      :type,
      :address,
      :longitude,
      :latitude,
      :balance,
      :phone_number,
      :description,
      :admin
    )
  end
  def authorise
  redirect_to root_path unless (@current_user.present?)
  end
end
