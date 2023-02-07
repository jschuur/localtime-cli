import OpenWeatherAPI from 'openweather-api-node';
import ora from 'ora';
import pc from 'picocolors';
import link from 'terminal-link';

import { TimeZoneLocation } from './types.js';
import { openWeatherMapUrlByCoordinates } from './util.js';

async function getWeather(city: string) {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const weatherApi = new OpenWeatherAPI({
    key: process.env.OPENWEATHER_API_KEY,
    locationName: city,
    units: 'metric',
  });

  const { weather, lat, lon } = await weatherApi.getCurrent();

  weatherApi.setLocationByCoordinates(lat, lon);
  const location = await weatherApi.getLocation();

  return { weather, location };
}

export async function showWeather(location: TimeZoneLocation) {
  const { type, name: city } = location;

  console.log();

  const spinner = ora('Looking up local weather...').start();

  try {
    if (type === 'city') {
      if (process.env.OPENWEATHER_API_KEY) {
        const { weather, location } = await getWeather(city);
        spinner.stop();

        console.log(
          `Local weather: ${pc.green(weather.temp.cur)}\u00B0C with ${
            weather.description
          }. (${pc.blue(
            link(
              `${location.name}, ${location.country}`,
              openWeatherMapUrlByCoordinates(location.lat, location.lon)
            )
          )})`
        );
      } else
        spinner.warn(
          `To include local weather, set the ${pc.green(
            'OPENWEATHER_API_KEY'
          )} environment variable: ${pc.dim('OPENWEATHER_API_KEY="abc123" localtime -y -w')})`
        );
    } else spinner.warn(`Weather information is only available for cities. Add cities with '-y'.`);
  } catch (error) {
    spinner.fail(
      `Unable to get the current weather for ${pc.cyan(city)} (${(error as Error).message})`
    );
  }
}
