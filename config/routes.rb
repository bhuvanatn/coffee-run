Rails.application.routes.draw do
  resources :line_items

  root to: 'pages#home'


  resources :items
  resources :orders
  resources :users, :only => [:new, :create, :index, :update, :show]

  get '/users/edit' => 'users#edit', :as => 'edit_user'
  get '/signup' => 'users#new'
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/stores' => 'users#stores'
  get '/store/:id' => 'users#store'
  get '/storeitems/:id' => 'items#store'

  get '/current_user' => 'session#current_user'
end
