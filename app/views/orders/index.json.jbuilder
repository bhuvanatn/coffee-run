json.array!(@orders) do |order|
  json.extract! order, :id, :customer_id, :runner_id, :store_id, :total_price, :status
  json.orders
  json.url order_url(order, format: :json)
end
