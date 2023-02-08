import pc from 'picocolors';

import { promptForTimezone } from './prompt.js';
import { showMoreDetails, showTime } from './time.js';
import { DefaultCmdOptions, TimeZoneLocation } from './types.js';
import { resolveOpenWeatherApiKey, showWeather } from './weather.js';

async function getLocation(options: DefaultCmdOptions) {
  let location;

  if (options.last) {
    location = global?.config.get('lastLocation') as TimeZoneLocation;

    if (!location) {
      console.error(`${pc.red('Error')}: No last location found.`);

      process.exit(1);
    }
  } else {
    if (!(options.timezone || options.country || options.city || options.cityAll)) {
      console.error('No locations included. Use -h for help.');

      process.exit(1);
    }

    location = await promptForTimezone(options);
  }

  return location;
}

export default async function command(options: DefaultCmdOptions) {
  const location = await getLocation(options);
  const openWeatherApiKey = resolveOpenWeatherApiKey(options);

  if (location) {
    showTime(location);

    if (options.weather) await showWeather(location, openWeatherApiKey);

    showMoreDetails(location);

    global.config.set('lastLocation', location);
  } else console.error(`${pc.red('Error')}: Unable to determine timezone location.`);
}
