import CityTimezones from 'city-timezones';
import CountryTimezones from 'countries-and-timezones';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import pc from 'picocolors';
import pluralize from 'pluralize';

import { AutoCompleteEntry, DefaultCmdOptions, TimeZoneLocation } from './types.js';
import { numberFormat } from './util.js';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

// don't list cities with population less than this by default
export const MIN_CITY_POPULATION = 250_000;

let autoCompleteEntries: AutoCompleteEntry[] = [];

// list of locations to choose from based on CLI options
function buildLocationList(options: DefaultCmdOptions) {
  const locations: TimeZoneLocation[] = [];

  if (options.timezone || options.all || options.allMin)
    locations.push(
      ...Object.keys(CountryTimezones.getAllTimezones()).map(
        (tz) =>
          ({
            name: tz,
            timezone: tz,
            type: 'timezone',
          } as const)
      )
    );

  if (options.country || options.all || options.allMin)
    locations.push(
      ...Object.values(CountryTimezones.getAllCountries() as Country[]).flatMap((country) =>
        country.timezones.map(
          (tz) =>
            ({
              // some countries have multiple timezones, give them individual entries
              name: country.timezones.length === 1 ? country.name : `${tz} (${country.name})`,
              timezone: tz,
              type: 'country',
            } as const)
        )
      )
    );

  if (options.city || options.cityAll || options.all || options.allMin)
    locations.push(
      ...(options.cityAll || options.all
        ? CityTimezones.cityMapping
        : CityTimezones.cityMapping.filter((c) => c.pop >= MIN_CITY_POPULATION)
      ).map(
        (c) => ({ name: `${c.city}, ${c.country}`, timezone: c.timezone, type: 'city' } as const)
      )
    );

  return locations;
}

const searchLocations = (answers: string[], input = '') =>
  autoCompleteEntries.filter((entry) => entry.name.toLowerCase().includes(input.toLowerCase()));

function locationScope(options: DefaultCmdOptions) {
  const locationTypes = (['country', 'city', 'timezone'] as const)
    .filter((o) => options[o])
    .map((o) => `${pluralize(o, 2)}`);
  const lastLocation = locationTypes.pop();

  return locationTypes.length ? locationTypes.join(', ') + ' and ' + lastLocation : lastLocation;
}

async function runPrompt(locations: TimeZoneLocation[], options: DefaultCmdOptions) {
  const scope = locationScope(options);
  autoCompleteEntries = locations.map((l) => ({ name: l.name, value: l }));

  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'location',
      message: `Pick from ${pc.magenta(numberFormat(locations.length))} ${scope}:`,
      emptyText: 'No matching location found',
      source: searchLocations,
      pageSize: 6,
    },
  ]);
}

export async function promptForTimezone(options: DefaultCmdOptions): Promise<TimeZoneLocation> {
  const locations = buildLocationList(options);

  const { location } = await runPrompt(locations, options);

  return location;
}
