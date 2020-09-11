class EventsController < ApplicationController
  def index
    render json: Event.all, each_serializer: EventSerializer
  end

  def show
    render json: Event.find(params[:id]), serializer: EventSerializer
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, serializer: EventSerializer
    else
      render json: event.errors, status: 422
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event, serializer: EventSerializer
    else
      render json: event.errors, status: 422
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy!
    render json: event, serializer: EventSerializer
  end

  private

  def event_params
    params.require(:event).permit(:id, :name, :start, :end, :timed, :description, :color, :calendar_id)
  end
end
