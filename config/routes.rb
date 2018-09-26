Rails.application.routes.draw do
  resources :teams
  resources :trailers
  resources :trailer_rentals
  resources :vehicles
  resources :vehicle_rentals
  resources :shipment_stop_items
  resources :shipment_stop_accessorials
  resources :shipment_stops
  resources :shipment_invoices
  resources :shipment_charges
  resources :shipment_costs
  resources :shipments do 
    get '/newstop', to: 'shipments#new_stop'
    get '/bol', to: 'shipments#bol'
    resources :shipment_invoices
    resources :shipment_charges
    resources :shipment_costs
  end
  resources :tariffs
  resources :location_notes
  resources :locations
  resources :contacts
  resources :clients
  resources :drivers
  resources :offices
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#show'
  get '/dispatch', to: 'dispatch#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'
  get '/home', to: 'welcome#show'
  get '/dispatch/assignedshipments/:date', to: 'dispatch#assignedshipments'
  get '/dispatch/unassignedshipments', to: 'dispatch#unassignedshipments'
end
