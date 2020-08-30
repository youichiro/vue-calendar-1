import moment from 'moment';

moment.locale('ja', {
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土']
});

export const eventDateFormatter = event => {
  // 8月10日(月)
  // 8月10日(月) 〜 11日(火)
  // 8月10日(月) 13:00 〜 14:00
  // 8月10日(月) 10:00 〜 8月11日(火) 11:00
  console.log(event);
  if (!event.timed && event.startDate === event.endDate) {
    return moment(event.start).format('M月D日(ddd)');
  }
  if (!event.timed) {
    return moment(event.start).format('M月D日(ddd) 〜 ') + moment(event.end).format('D日(ddd)');
  }
  if (event.startDate === event.endDate) {
    return moment(event.start).format('M月D日(ddd) HH:mm 〜 ') + moment(event.end).format('HH:mm');
  }
  return (
    moment(event.start).format('M月D日(ddd) HH:mm 〜 ') +
    moment(event.end).format('M月D日(ddd) HH:mm')
  );
};
