class Contact < ApplicationRecord
  validates :name, presence: true
  belongs_to :client
  has_many :location_contacts
  has_many :locations, through: :location_contacts
end
