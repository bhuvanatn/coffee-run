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

Item.destroy_all
i1 = Item.create name: 'Flat White', price: "3.0"
i2 = Item.create name: 'Flat White', price: "3.1"
i3 = Item.create name: 'Flat White', price: "3.2"
i4 = Item.create name: 'Latte', price: "3.5"
i5 = Item.create name: 'Latte', price: "3.6"
i6 = Item.create name: 'Latte', price: "3.7"
i7 = Item.create name: 'Long Black', price: "2.5"
i8 = Item.create name: 'Long Black', price: "2.6"
i9 = Item.create name: 'Long Black', price: "2.7"

s1.items << i1 << i4 << i7
s2.items << i2 << i5 << i8
s3.items << i3 << i6 << i9
