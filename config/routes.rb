Rails.application.routes.draw do
  resources :teams
  resources :trailers
  resources :vehicles
  resources :shipment_stop_items
  resources :shipment_stop_accessorials
  resources :shipment_stops
  resources :shipment_invoices
  resources :shipment_charges
  resources :shipment_costs
  resources :shipments
  resources :tariffs
  resources :location_notes
  resources :locations
  resources :contacts
  resources :clients
  resources :drivers
  resources :offices
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'
end
