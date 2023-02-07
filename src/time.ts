import { rawTimeZones } from '@vvo/tzdb';
import pc from 'picocolors';

import { TimeZoneLocation } from './types.js';

function timePeriodOfDay(timeZone: string) {
  const hour = parseInt(
    new Date().toLocaleString('default', { hour: '2-digit', hour12: false, timeZone }),
    10
  );

  const timePeriods = {
    'at night': [0, 1],
    'late at night': [2, 4],
    'early in the morning': [5, 6],
    'in the morning': [7, 9],
    'late in the morning': [10, 11],
    'at noon': [12],
    'early in the afternoon': [13],
    'in the afternoon': [14, 15],
    'late in the afternoon': [16],
    'early in the evening': [17, 18],
    'in the evening': [19, 20],
    'late in the evening': [21],
  };

  return (
    Object.entries(timePeriods).find(([, range]) => {
      const start = range[0];
      const end = range[1] || start;

      return hour >= start && hour <= end;
    })?.[0] || 'at night'
  );
}

export const timezoneAbbreviation = (timezone: string) =>
  rawTimeZones.find((tz) => tz.name === timezone)?.abbreviation;

export function showTime(location: TimeZoneLocation) {
  const { timezone, type, name } = location;

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: timezone as string,
  };
  const time = new Intl.DateTimeFormat('default', formatOptions).format(new Date());

  console.log();

  console.log(
    `In ${pc.cyan(type === 'city' ? name : timezone)} it is currently ${pc.green(
      time
    )}, ${timePeriodOfDay(timezone)}.`
  );
}

export function showMoreDetails(location: TimeZoneLocation) {
  if (location.timezone) {
    const abbreviation = timezoneAbbreviation(location.timezone);

    if (abbreviation)
      console.log(
        `\nMore on this timezone: ${pc.blue(
          `https://www.timeanddate.com/time/zones/${abbreviation.toLowerCase()}`
        )}`
      );
  }
}
