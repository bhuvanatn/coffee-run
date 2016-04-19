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
#

class User < ActiveRecord::Base
  has_secure_password
  validates :email, :password_digest, :presence => true, :uniqueness => true
  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
end
