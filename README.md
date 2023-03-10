# Local time and weather command line tool

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
- `-c` `--country` use [country names](https://github.com/manuelmhtr/countries-and-timezones)
- `-y` `--city` use [city names](https://github.com/kevinroberts/city-timezones) with a population >= 250,000
- `-Y` `--city-all` use all city names
- `-a` `--all-min`, use all location types (with minimum city population)
- `-A` `--all` use all location types (no city population minimum)
- `-w` `--weather` include local weather
- `-o` `--openweather-api-key <key>` specify OpenWeather API key
- `-O` `--save-openweather-api-key <key>` specify and save OpenWeather API key for future use
- `-l` `--last` bypass location search and reuse last location used
- `-C` `--metric`, use metric units (celsius)
- `-F` `--imperial`, use imperial units (fahrenheit)

Thus `localtime -c -y` would search time zone, country and larger city names and `localtime --no-timezone -Y` would search just through all city names, since time zones are always used unless explicitly excluded.

Multiple single letter options [can be combined](https://www.npmjs.com/package/commander#common-option-types-boolean-and-value) too: `localtime -cy`.

The last previously used location will be sorted to the top of the list unless `--skip-last-used-sort` is used.

#### Weather

Weather info works for city selections and requires a [free OpenWeather API key](https://openweathermap.org/api) provided via the `-o` option to use it once or `-O` to save it for future use without needing to provide it as an option again.

Example:

```
localtime -y -w -O abc123
```

In subsequent uses, you can then just run `localtime -y -w`.

You can also set it via the `OPENWEATHER_API_KEY` environment variable.

Initially, the metric system will be used and weather temperatures will be in celsius. Subsequent invocations will reuse the previously specified unit of measurement, unless a new one is selected via command line options.

\- [Joost Schuur](https://joostschuur.com) ([@joostschuur](https://twitter.com/joostschuur))
