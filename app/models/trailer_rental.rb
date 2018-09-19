class TrailerRental < ApplicationRecord
  belongs_to :trailer
  belongs_to :office
end