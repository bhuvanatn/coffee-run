json.array!(@customers) do |customer|
  json.extract! customer, :id, :email, :password, :string, :phone_number, :balance
  json.url customer_url(customer, format: :json)
end
