import { format, addHours, addMinutes, isBefore } from 'date-fns';
import { ja } from 'date-fns/locale';

export const getCurrectDateStr = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const formatDateToMonthlyStr = date => {
  return format(new Date(date), 'yyyy年 M月');
};

export const formatDateToJa = date => {
  // date: '2020-10-01'
  // return: '10月1日 (水)'
  return format(new Date(date), 'M月d日 (E)', { locale: ja });
};

export const formatTimeToJa = time => {
  // time: '09:00'
  // return: '9時'
  return format(new Date(`2020-08-01 ${time}`), 'H時');
};

export const eventDateFormatter = event => {
  // 8月10日(月)
  // 8月10日(月) 〜 11日(火)
  // 8月10日(月) 13:00 〜 14:00
  // 8月10日(月) 10:00 〜 8月11日(火) 11:00
  if (!event.timed && event.startDate === event.endDate) {
    return format(event.start, 'M月d日(E)', { locale: ja });
  }
  if (!event.timed) {
    return format(event.start, 'M月d日(E) ~ ', { locale: ja }) + format(event.end, 'd日(E)', { locale: ja });
  }
  if (event.startDate === event.endDate) {
    return format(event.start, 'M月d日(E) HH:mm ~ ', { locale: ja }) + format(event.end, 'HH:mm');
  }
  return (
    format(event.start, 'M月d日(E) HH:mm ~ ', { locale: ja }) + format(event.end, 'M月d日(E) HH:mm', { locale: ja })
  );
};

export const getDefaultStartAndEnd = date => {
  const currentTime = format(new Date(), 'HH:mm:ss');
  const datetime = new Date(`${date} ${currentTime}`);
  const start = format(addHours(datetime, 1), 'yyyy-MM-dd HH:00:00');
  const end = format(addHours(datetime, 2), 'yyyy-MM-dd HH:00:00');
  return [start, end];
};

export const getTimeIntervalList = () => {
  const start = new Date('2020-08-01 00:00:00');
  const end = new Date('2020-08-01 24:00:00');
  let times = [];
  for (let target = new Date(start); isBefore(target, end); target = addMinutes(target, 15)) {
    times.push(format(target, 'HH:mm'));
  }
  return times;
};

export const isGreaterEndThanStart = (startDate, startTime, endDate, endTime, allDay) => {
  const start = new Date(`${startDate} ${startTime}`).getTime();
  const end = new Date(`${endDate} ${endTime}`).getTime();
  return allDay ? end >= start : end > start;
};
