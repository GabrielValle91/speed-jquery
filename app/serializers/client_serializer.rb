class ClientSerializer < ActiveModel::Serializer
  attributes :name, :qb_name, :billing_address1, :billing_address2, :billing_city, :billing_state, :billing_zip, :billing_email, :net_terms
  has_many :tariffs
end