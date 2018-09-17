class LocationSerializer < ActiveModel::Serializer
  attributes :company_name, :address1, :address2, :city, :state, :zip
end