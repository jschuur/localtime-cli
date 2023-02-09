import OpenWeatherAPI from 'openweather-api-node';
import ora from 'ora';
import pc from 'picocolors';
import link from 'terminal-link';

import { DefaultCmdOptions, TimeZoneLocation, UnitMeasurement } from './types.js';
import { openWeatherMapUrlByCoordinates } from './util.js';
import emojiWeather from './weatherEmoji.js';

export function resolveOpenWeatherApiKey(options: DefaultCmdOptions) {
  if (options.saveOpenweatherApiKey)
    global?.config.set('openWeatherApiKey', options.saveOpenweatherApiKey);

  return (
    options.openweatherApiKey ||
    options.saveOpenweatherApiKey ||
    process.env.OPEN_WEATHER_API_KEY ||
    (global?.config.get('openWeatherApiKey') as string) ||
    undefined
  );
}

async function getWeather(
  city: string,
  openWeatherApiKey: string | undefined,
  measurement: UnitMeasurement
) {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const weatherApi = new OpenWeatherAPI({
    key: openWeatherApiKey,
    locationName: city,
    units: measurement,
  });

  const { weather, lat, lon } = await weatherApi.getCurrent();

  weatherApi.setLocationByCoordinates(lat, lon);
  const location = await weatherApi.getLocation();
  const emoji = emojiWeather(weather.description);

  return { weather, location, emoji };
}

async function weatherDetails(
  city: string,
  openWeatherApiKey: string,
  measurement: UnitMeasurement
) {
  const { weather, location, emoji } = await getWeather(city, openWeatherApiKey, measurement);

  return `Local weather: ${pc.green(weather.temp.cur)} \u00B0${
    measurement === 'metric' ? 'C' : 'F'
  } with ${weather.description}${emoji ? ` ${emoji}` : '.'} (${pc.blue(
    link(
      `${location.name}, ${location.country}`,
      openWeatherMapUrlByCoordinates(location.lat, location.lon)
    )
  )})`;
}

export async function showWeather(
  location: TimeZoneLocation,
  openWeatherApiKey: string | undefined,
  measurement: UnitMeasurement
) {
  const { type, name: city } = location;

  console.log();

  const spinner = ora('Looking up local weather...').start();

  try {
    if (type === 'city') {
      if (openWeatherApiKey) {
        const weatherText = await weatherDetails(city, openWeatherApiKey, measurement);
        spinner.stop();

        console.log(weatherText);
      } else
        spinner.warn(
          `To include local weather, set the ${pc.green(
            'OPENWEATHER_API_KEY'
          )} environment variable or use '-o': ${pc.dim(
            'localtime -y -w -o abc123'
          )}. -O will save the key for future use.`
        );
    } else spinner.warn(`Weather information is only available for cities. Add cities with '-y'.`);
  } catch (error) {
    spinner.fail(
      `Unable to get the current weather for ${pc.cyan(city)} (${(error as Error).message})`
    );
  }
}
