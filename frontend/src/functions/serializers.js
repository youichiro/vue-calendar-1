import { format } from 'date-fns';

export const serializeEvent = event => {
  if (event === null) {
    return null;
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    ...event,
    start,
    end,
    color: event.color || '#2196F3',
    startDate: format(start, 'yyyy-MM-dd'),
    startTime: event.timed ? format(start, 'HH:mm') : null,
    endDate: format(end, 'yyyy-MM-dd'),
    endTime: event.timed ? format(end, 'HH:mm') : null
  };
};
