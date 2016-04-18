class RemoveLocationFromOrders < ActiveRecord::Migration
  def change
    remove_column :orders, :customer_location_id
    remove_column :orders, :driver_location_id
  end
end
