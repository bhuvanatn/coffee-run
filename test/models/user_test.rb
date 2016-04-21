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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
