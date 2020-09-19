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
