class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :type
      t.string :name
      t.string :email
      t.string :password_digest
      t.text :address
      t.float :longitude
      t.float :latitude
      t.money :balance
      t.string :phone_number
      t.string :image
      t.text :description
      t.timestamps null: false
    end
  end
end
