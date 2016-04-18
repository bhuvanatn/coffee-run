Rails.application.routes.draw do
  resources :line_items
  root to: 'welcome#index'
  
  resources :users, :only => [:new, :create, :index, :update]

  get '/users/edit' => 'users#edit', :as => 'edit_user'
  get '/signup' => 'users#new'
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :items
  resources :orders
  resources :customers

  end
