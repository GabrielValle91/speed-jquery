class Client < ApplicationRecord
  validates :name, :qb_name, presence: true
  validates :name, :qb_name, uniqueness: true
  has_many :contacts
  has_many :office_clients
  has_many :offices, through: :office_clients
  has_many :tariffs
end
