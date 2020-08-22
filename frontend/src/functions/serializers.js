import moment from 'moment';

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
    color: event.color || 'blue',
    startDate: start.getFullYear() + moment(event.start).format('-MM-DD'),
    startTime: event.timed ? moment(event.start).format('HH:mm:ss') : null,
    endDate: end.getFullYear() + moment(event.end).format('-MM-DD'),
    endTime: event.timed ? moment(event.end).format('HH:mm:ss') : null
  };
};
