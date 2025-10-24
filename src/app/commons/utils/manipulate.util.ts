import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export function addNowDayEndOfDay(): string {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const day = dayjs();
  return day
    .add(14, 'day')
    .set('hour', 23)
    .set('minute', 59)
    .set('second', 59)
    .set('millisecond', 999)
    .utcOffset('+07:00')
    .utc(true)
    .toISOString();
}
