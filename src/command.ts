import pc from 'picocolors';

import { promptForTimezone } from './prompt.js';
import { showMoreDetails, showTime } from './time.js';
import { DefaultCmdOptions } from './types.js';
import { resolveOpenWeatherApiKey, showWeather } from './weather.js';

export default async function command(options: DefaultCmdOptions) {
  if (!(options.timezone || options.country || options.city || options.cityAll)) {
    console.error('No locations included. Use -h for help.');

    process.exit(1);
  }

  const openWeatherApiKey = resolveOpenWeatherApiKey(options);
  const location = await promptForTimezone(options);

  if (location) {
    showTime(location);

    if (options.weather) await showWeather(location, openWeatherApiKey);

    showMoreDetails(location);
  } else console.error(`${pc.red('Error')}: Unable to determine timezone location.`);
}
