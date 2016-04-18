class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :item_id
      t.integer :quantity
      t.integer :order_id
      t.string :notes
      t.money :unit_price

      t.timestamps null: false
    end
  end
end
