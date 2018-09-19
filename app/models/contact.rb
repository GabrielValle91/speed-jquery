class Contact < ApplicationRecord
  validates :name, presence: true
  belongs_to :client
  has_many :shipment_stops
  has_many :locations, through: :shipment_stops
end
