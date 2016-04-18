# == Schema Information
#
# Table name: line_items
#
#  id         :integer          not null, primary key
#  item_id    :integer
#  quantity   :integer
#  order_id   :integer
#  notes      :string
#  unit_price :money
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class LineItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
