# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160420231757) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.money    "price",       scale: 2
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "store_id"
  end

  create_table "line_items", force: :cascade do |t|
    t.integer  "item_id"
    t.integer  "quantity"
    t.integer  "order_id"
    t.string   "notes"
    t.money    "unit_price", scale: 2
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "customer_id"
    t.integer  "runner_id"
    t.integer  "store_id"
    t.money    "total_price", scale: 2
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "status"
  end

  create_table "users", force: :cascade do |t|
    t.string   "type"
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.text     "address"
    t.float    "longitude"
    t.float    "latitude"
    t.money    "balance",         scale: 2
    t.string   "phone_number"
    t.string   "image"
    t.text     "description"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "admin"
  end

end
