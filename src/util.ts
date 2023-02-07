export const numberFormat = new Intl.NumberFormat('default').format;

export const openWeatherMapUrlByCoordinates = (lat: number, lon: number) =>
  `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=10`;
