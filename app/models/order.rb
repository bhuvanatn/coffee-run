# == Schema Information
#
# Table name: orders
#
#  id          :integer          not null, primary key
#  customer_id :integer
#  runner_id   :integer
#  store_id    :integer
#  total_price :money
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Order < ActiveRecord::Base
  belongs_to :customer, :class_name =>'User', :foreign_key => 'customer_id'
  belongs_to :store, :class_name =>'User', :foreign_key => 'store_id'
  belongs_to :runner, :class_name =>'User', :foreign_key => 'runner_id'
  has_many :line_items
end
