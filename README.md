# Localtime CLI

Command-line tool to look up the local time (and weather) for time zones, countries and cities with auto-completion.

<p align="center">
  <img src="https://github.com/jschuur/localtime-cli/blob/main/localtime.gif?raw=true" alt="Animated GIF of localtime shell CLI, showing the city of London being typed in and picked from a list, then local time and weather results appear.">
</p>

My partner (:heart: :frog:) was out of town, and I wanted a quick way to see her local time and weather. Fun little project to start using TypeScript too.

## Usage

Install as a global `localtime` command:

```
npm install -g localtime-cli
```

Or run ad hoc:

```
npx localtime-cli
```

### Options

Show full options with `localtime --help`

- `-t` `--timezone` use timezone names for search (default: true)
- `--no-timezone` don't use timezone names
- `-c` `--country` use [country names](https://github.com/manuelmhtr/countries-and-timezones) (default: false)
- `-y` `--city` use [city names](https://github.com/kevinroberts/city-timezones) with a population >= 250,000 (default: false)
- `-Y` `--city-all` use all city names (default: false)
- `-a` `--all-min`, use all location types (with minimum city population)
- `-A` `--all` use all location types (no city population minimum)
- `-w` `--weather` include local weather (default: false)

Thus `localtime -c -y` would search time zone, country and larger city names and `localtime --no-timezone -Y` would search just through all city names, since time zones are always used unless explicitly excluded.

Weather info works for city selections and requires a [free OpenWeather API key](https://openweathermap.org/api) set via the `OPENWEATHER_API_KEY` environment variable.

Example:

```
OPENWEATHER_API_KEY='abc123' localtime -y -w
```

\- [Joost Schuur](https://joostschuur.com) ([@joostschuur](https://twitter.com/joostschuur))
