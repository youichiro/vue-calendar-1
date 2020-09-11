class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start, :end, :timed, :description, :color
  belongs_to :calendar
end
