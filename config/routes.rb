Rails.application.routes.draw do
  resources :line_items

  root to: 'pages#home'


  resources :items
  resources :orders
  resources :session
  resources :users, :only => [:new, :create, :index, :update, :show]

  get '/users/:id/edit' => 'users#edit', :as => 'edit_user'
  get '/signup' => 'users#new'
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/stores' => 'users#stores'
  get '/runners' => 'users#runners'
  get '/customers' => 'users#customers'
  get '/store/:id' => 'users#store'
  get '/storeitems/:id' => 'items#store'
  get '/orderitems/:id' => 'line_items#order'

  get '/current_user' => 'session#current_user'
  get '/stores_within' => 'users#stores_within'
  get '/orders_information' => 'orders#information'
  get '/order_associations/:id' => 'orders#associations'
end
