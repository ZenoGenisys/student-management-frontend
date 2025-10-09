import dayjs from 'dayjs';

export const getFormattedDate = (date?: string | Date) => {
  const formatter = String(date).split('-').length === 2 ? 'MMMM, YYYY' : 'MMMM D, YYYY';
  return dayjs(date).format(formatter);
};
