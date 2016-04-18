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
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
