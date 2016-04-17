class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :email
      t.string :password
      t.string :string
      t.integer :phone_number
      t.money :balance

      t.timestamps null: false
    end
  end
end
