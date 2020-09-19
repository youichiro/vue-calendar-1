import moment from 'moment';

export const getCurrectDateStr = () => {
  return moment().format('YYYY-MM-DD');
};

export const formatDateToMonthlyStr = date => {
  return moment(date).format('YYYY年 M月');
};

export const getDefaultStartAndEnd = date => {
  const currentTime = moment().format('HH:mm:ss');
  let datetime = moment(`${date} ${currentTime}`);
  const start = `${datetime.add(1, 'h').format('YYYY-MM-DD HH')}:00:00`;
  const end = `${datetime.add(1, 'h').format('YYYY-MM-DD HH')}:00:00`;
  return [start, end];
};

export const getTimeIntervalList = (intervalNum = 15, intervalUnit = 'minutes') => {
  const start = moment('2020-08-01 00:00:00');
  const end = moment('2020-08-01 24:00:00');
  let times = [];
  for (let target = start.clone(); target.isBefore(end); target.add(intervalNum, intervalUnit)) {
    times.push(target.format('HH:mm'));
  }
  return times;
};

export const isGreaterEndThanStart = (startDate, startTime, endDate, endTime, allDay) => {
  const start = moment(`${startDate} ${startTime}`);
  const end = moment(`${endDate} ${endTime}`);
  return allDay ? end >= start : end > start;
};
