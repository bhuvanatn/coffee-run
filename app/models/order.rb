class Order < ActiveRecord::Base
  has_many :customer
end
