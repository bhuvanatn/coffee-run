# == Schema Information
#
# Table name: orders
#
#  id                   :integer          not null, primary key
#  customer_id          :integer
#  customer_location_id :integer
#  driver_id            :integer
#  driver_location_id   :integer
#  store_id             :integer
#  total_price          :money
#  created_at           :datetime
#  updated_at           :datetime
#

class Order < ActiveRecord::Base
end
