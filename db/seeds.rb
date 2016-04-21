User.destroy_all

c1 = Customer.create name: 'customer_1', email: 'customer1@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000
c2 = Customer.create name: 'customer_2', email: 'customer2@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000
c3 = Customer.create name: 'customer_3', email: 'customer3@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000

r1 = Runner.create name: 'runner_1', email: 'runner1@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000
r2 = Runner.create name: 'runner_2', email: 'runner2@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000
r3 = Runner.create name: 'runner_2', email: 'runner3@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '56 York st Sydney', balance: 1000

s1 = Store.create name: 'metropole', email: 'metropole@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '455 George st Sydney', balance: 1000
s2 = Store.create name: 'Single Origin Coffee', email: 'SOC@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '89 York st Sydney', balance: 1000
s3 = Store.create name: 'Mecca', email: 'mecca@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '67 King st Sydney', balance: 1000
s4 = Store.create name: 'Bunker', email: 'bunker@ga.co', password: 'chicken', password_confirmation: 'chicken', address: '99 Mount st North Sydney', balance: 1000


Order.destroy_all
o1 = Order.create total_price: 5.00 status: 'pending'
o2 = Order.create total_price: 5.00 status: 'pending'
o3 = Order.create total_price: 5.00 status: 'pending'
o4 = Order.create total_price: 5.00 status: 'confirmed'
o5 = Order.create total_price: 5.00 status: 'confirmed'
o6 = Order.create total_price: 5.00 status: 'confirmed'
o7 = Order.create total_price: 5.00 status: 'pickedUp'
o8 = Order.create total_price: 5.00 status: 'delivered'

Item.destroy_all
i1 = Item.create name: 'Flat White', price: 3.0, store_id: s1.id
i2 = Item.create name: 'Flat White', price: 3.1
i3 = Item.create name: 'Flat White', price: 3.2
i4 = Item.create name: 'Latte', price: 3.5
i5 = Item.create name: 'Latte', price: 3.6
i6 = Item.create name: 'Latte', price: 3.7
i7 = Item.create name: 'Long Black', price: 2.5
i8 = Item.create name: 'Long Black', price: 2.6
i9 = Item.create name: 'Long Black', price: 2.7

LineItem.destroy_all
l1 = LineItem.create quantity: 1
l2 = LineItem.create quantity: 1
l4 = LineItem.create quantity: 1
l5 = LineItem.create quantity: 1
l6 = LineItem.create quantity: 1
l7 = LineItem.create quantity: 1
l8 = LineItem.create quantity: 1
l9 = LineItem.create quantity: 1


s1.items << i1 << i4 << i7
s2.items << i2 << i5 << i8
s3.items << i3 << i6 << i9

l1.items << i1
l2.items << i4
l3.items << i7
l4.items << i1
l5.items << i4
l6.items << i7
l7.items << i1
l8.items << i4
l9.items << i7
l10.items << i1
l11.items << i4


o1.line_items << l1 << l2
o2.line_items << l3
o3.line_items << l4
o4.line_items << l5 << l6
o5.line_items << l7
o6.line_items << l8
o7.line_items << l9 << l10
o8.line_items << l11


c1.orders << o1 << o4 << o7 << o8
c2.orders << o2 << o5
c3.orders << o3 << o6

s1.orders << o1 << o3 << o4 << o5 << o6 << o7 << o8

r1.orders << o4 << o5 << o6 << o7 << o8
