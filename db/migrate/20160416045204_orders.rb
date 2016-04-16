class Orders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :customer_id
      t.integer :customer_location_id
      t.integer :driver_id
      t.integer :driver_location_id
      t.integer :store_id
      t.money :total_price
      t.timestamps
    end
  end
end
