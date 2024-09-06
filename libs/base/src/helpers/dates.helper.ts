import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';

export const getDateFormatedForInvoice = (dateISOString?: string) => {
  const date = dateISOString ? moment(dateISOString) : moment();
  return date.utcOffset(-6).format('YYYY-MM-DDTHH:mm:ss');
};

export const getPartsOfDate = () => {
  const date = new Date();

  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(days / 7);

  return {
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    weekDay: date.getDay() + 1,
    weekNumber: weekNumber,
  };
};

export const validateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    throw new BadRequestException(`Invalid date range, startDate must be less than endDate`);
  }

  const limitAllowed = Number(process.env.DATE_RANGE_LIMIT_ALLOWED_IN_DAYS) || 90;

  const dateDiff = end.valueOf() - start.valueOf();
  const dateDiffInDays = Math.floor(dateDiff / (24 * 60 * 60 * 1000));

  if (dateDiffInDays > limitAllowed) {
    throw new BadRequestException(`The query range must be between 1 and ${limitAllowed} days`);
  }

  return true;
};
