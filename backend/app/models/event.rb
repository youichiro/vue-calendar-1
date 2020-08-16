class Event < ApplicationRecord
  validates :name, presence: true, length: { maximux: 100 }
  validates :start, presence: true
  validates :end, presence: true
end
