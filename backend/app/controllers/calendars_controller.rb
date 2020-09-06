class CalendarsController < ApplicationController
  def index
    render json: Calendar.all, each_serializer: CalendarSerializer
  end

  def show
    render json: Calendar.find(params[:id]), serializer: CalendarSerializer
  end

  def create
    calendar = Calendar.new(calendar_params)
    if calendar.save
      render json: calendar, serializer: CalendarSerializer
    else
      render json: calendar.errors, status: 422
    end
  end

  def update
    calendar = Calendar.find(params[:id])
    if calendar.update(calendar_params)
      render json: calendar, serializer: CalendarSerializer
    else
      render json: calendar.errors, status: 422
    end
  end

  def destroy
    calendar = Calendar.find(params[:id])
    calendar.destroy!
    render json: calendar, serializer: CalendarSerializer
  end

  private

  def calendar_params
    params.require(:calendar).permit(:id, :name, :color, :visibility)
  end
end
