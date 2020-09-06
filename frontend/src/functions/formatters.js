import moment from 'moment';

moment.locale('ja', { weekdays: ['日', '月', '火', '水', '木', '金', '土'] });

export const formatDateToJa = date => {
  if (date === null) {
    return;
  }
  return moment(date).format('M月D日 (dddd)');
};

export const eventDateFormatter = event => {
  // 8月10日(月)
  // 8月10日(月) 〜 11日(火)
  // 8月10日(月) 13:00 〜 14:00
  // 8月10日(月) 10:00 〜 8月11日(火) 11:00
  if (!event.timed && event.startDate === event.endDate) {
    return moment(event.start).format('M月D日(dddd)');
  }
  if (!event.timed) {
    return moment(event.start).format('M月D日(dddd) 〜 ') + moment(event.end).format('D日(dddd)');
  }
  if (event.startDate === event.endDate) {
    return moment(event.start).format('M月D日(dddd) HH:mm 〜 ') + moment(event.end).format('HH:mm');
  }
  return moment(event.start).format('M月D日(dddd) HH:mm 〜 ') + moment(event.end).format('M月D日(dddd) HH:mm');
};

export const formatTimeToJa = time => {
  if (time === null) {
    return;
  }
  return moment(`2020-10-01 ${time}`).format('H時');
};
