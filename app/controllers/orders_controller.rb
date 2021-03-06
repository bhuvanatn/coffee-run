class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  # GET /orders
  # GET /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  # POST /orders.json
  def create
    @order = Order.new(order_params)

    respond_to do |format|
      if @order.save
        format.html { redirect_to @order, notice: 'Order was successfully created.' }
        format.json { render :show, status: :created, location: @order }
      else
        format.html { render :new }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def information
    if @current_user.type == "Store"
      @orders = Order.where :store_id => @current_user.id, :status => "confirmed"
      @stores = [@current_user]
    elsif @current_user.type == "Runner"
      @stores = Store.near([@current_user.latitude, @current_user.longitude], 1, :units => :km)
      @orders = []
      @stores.each do |s|
        @orders += s.orders
      end
      @orders = @orders.select {|o| o[:status] == "pending"}
    elsif @current_user.type == 'Customer'
      @orders = Order.where :customer_id => @current_user.id
      @stores = []
      @orders.each do |o|
         @stores.push(o.store)
      end
    end

    @line_items = @orders.map {|o| o.line_items}.flatten
    @items = @line_items.map {|l| l.item}.uniq
    @customers = @orders.map {|o| o.customer}.uniq

    render :json => {
      :orders => @orders,
      :stores => @stores,
      :line_items => @line_items,
      :items => @items,
      :customers => @customers
    }
  end

  def associations
    @order = Order.find params[:id]
    @store = @order.store
    @customer = @order.customer
    @runner = @order.runner
    @line_items = @order.line_items
    @items = @line_items.map {|li| li.item}
    render :json => {
      :order => @order,
      :store => @store,
      :customer => @customer,
      :lineItems => @line_items,
      :items => @items
    }
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.

    def order_params
      params.require(:order).permit(:customer_id, :runner_id, :store_id, :total_price, :status)
    end
end
