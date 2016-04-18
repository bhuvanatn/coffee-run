json.array!(@line_items) do |line_item|
  json.extract! line_item, :id, :item_id, :quantity, :order_id, :notes, :unit_price
  json.url line_item_url(line_item, format: :json)
end
