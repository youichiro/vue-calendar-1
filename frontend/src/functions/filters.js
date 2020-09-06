import moment from 'moment';
import { serializeEvent } from './serializers';

export const filterEventsByDate = (events, date) => {
  return events
    .map(event => serializeEvent(event))
    .filter(
      event =>
        event.startDate === date || event.endDate === date || moment(date).isBetween(event.startDate, event.endDate)
    );
};
