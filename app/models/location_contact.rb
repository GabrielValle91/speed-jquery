class LocationContact < ApplicationRecord
  belongs_to :location
  belongs_to :contact
end