import { DefaultCmdOptions, MeasurementUnit } from './types.js';

export const numberFormat = new Intl.NumberFormat('default').format;

export const openWeatherMapUrlByCoordinates = (lat: number, lon: number) =>
  `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=10`;

export function getMeasurementUnit(options: DefaultCmdOptions): MeasurementUnit {
  if (options.metric || options.imperial) {
    const measurementUnit = options.metric === true ? 'metric' : 'imperial';

    global.config.set('measurementUnit', measurementUnit);

    return measurementUnit;
  }

  return (global.config.get('measurementUnit') as MeasurementUnit) === 'imperial'
    ? 'imperial'
    : 'metric';
}
