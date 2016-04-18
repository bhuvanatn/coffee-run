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

class LineItem < ActiveRecord::Base
  belongs_to :order
  belongs_to :item
end
