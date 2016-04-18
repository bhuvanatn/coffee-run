# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  price       :money
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  store_id    :integer
#

class Item < ActiveRecord::Base
  has_many :line_items
  belongs_to :store
end
