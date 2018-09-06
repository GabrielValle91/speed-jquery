class LocationNote < ApplicationRecord
  validates :note, presence: true
  belongs_to :location
end
