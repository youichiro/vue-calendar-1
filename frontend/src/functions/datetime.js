import { format, addHours, addMinutes, isBefore } from 'date-fns';

export const getCurrectDateStr = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const formatDateToMonthlyStr = date => {
  return format(new Date(date), 'yyyy年 M月');
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
