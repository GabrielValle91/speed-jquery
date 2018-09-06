class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  has_many :office_users
  has_many :offices, through: :office_users
end
