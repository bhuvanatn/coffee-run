# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  type            :string
#  name            :string
#  email           :string
#  password_digest :string
#  address         :text
#  longitude       :float
#  latitude        :float
#  balance         :money
#  phone_number    :string
#  image           :string
#  description     :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  admin           :boolean
#

class Store < User
  has_many :orders
  has_many :items
end
