type WeatherEmojis = Array<[name: string, emoji: string, unicode: string, keywords: string[]]>;

// weather emojis: https://unicode-table.com/en/emoji/travel-and-places/sky-and-weather/
// description keywords based on https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// with some additions. some unicode strings include extra padding for consistency
const weatherEmojis: WeatherEmojis = [
  ['sun', '🌞', '\u{1F31E}', ['clear sky', 'clear skies', 'sunny']],
  // this one doesn't render great in the terminal
  // ['cloud', '☁', '\u2601', []],
  ['mostlySunny', '🌤', '\u{1F324} ', ['few clouds', 'scattered clouds']],
  ['partlyCloudy', '⛅', '\u{26C5}', ['broken clouds', 'cloudy']],
  ['mostlyCloudy', '🌥', '\u{1F325} ', ['overcast clouds']],
  ['cloudSunRain', '🌦', '\u{1F326} ', ['drizzle']],
  ['cloudRain', '🌧', '\u{1F327} ', ['rain']],
  // not ideal, but slightly better than \u26C8
  ['cloudLightning', '🌩', '\u{1F329} ', ['thunderstorm', 'lightning']],
  // ['cloudLightningRain', '⛈', '\u{26C8}', ['thunderstorm', 'lightning']],
  ['cloudSnow', '🌨', '\u{1F328} ', ['snow', 'blizzard']],
  // not en OpenWeather description, but listed just in case
  ['wind', '💨', '\u{1F4A8}', ['wind']],
  ['fog', '🌫', '\u{1F32B} ', ['fog', 'mist', 'smoke', 'haze', 'dust', 'squalls']],
  ['tornado', '🌪', '\u{1F32A} ', ['tornado']],
];

export default function emojiWeather(weather: string): string | undefined {
  if (typeof weather !== 'string') return '';

  return weatherEmojis.find(([, , , keywords]) => keywords.some((k) => weather.includes(k)))?.[2];
}
