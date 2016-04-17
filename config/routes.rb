Rails.application.routes.draw do
  resources :items
  resources :orders
  resources :customers

  root to: 'welcome#index'


  end
