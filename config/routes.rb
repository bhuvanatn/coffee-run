Rails.application.routes.draw do
  resources :line_items
  root to: 'pages#home'

  resources :users, :only => [:new, :create, :index, :update, :show]

  get '/users/edit' => 'users#edit', :as => 'edit_user'
  get '/signup' => 'users#new'
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :items
  resources :orders

  end
