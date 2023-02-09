#!/usr/bin/env node

import path from 'path';
import url from 'url';

import { program } from 'commander';
import Conf from 'conf';
import 'dotenv/config';
import jsonfile from 'jsonfile';
import updateNotifier from 'update-notifier';

import { MIN_CITY_POPULATION } from './prompt.js';

import command from './command.js';
import { numberFormat } from './util.js';

const packageJson = jsonfile.readFileSync(
  path.join(url.fileURLToPath(new URL('.', import.meta.url)), '../package.json')
);

updateNotifier({ pkg: packageJson }).notify();

declare global {
  // eslint-disable-next-line no-var
  var config: Conf;
}

const config = new Conf({ projectName: 'localtime-cli' });
global.config = config;

program
  .name('localtime')
  .description('Show the current time/weather in a given timezone/country/city')
  .version(packageJson.version);

program
  .option('--no-timezone', `don't use timezone names`)
  .option('-t --timezone', 'use timezone names', true)
  .option('-c --country', 'use country names', false)
  .option('-y --city', `use city names, population >= ${numberFormat(MIN_CITY_POPULATION)}`, false)
  .option('-Y --city-all', 'use all city names', false)
  .option('-a --all-min', 'use all location types (with minimum city population)', false)
  .option('-A --all', 'use all location types (no city population minimum)', false)
  .option('-w --weather', 'include local weather (via OpenWeather API)', false)
  .option('-o --openweather-api-key <key>', 'specify OpenWeather API key')
  .option(
    '-O --save-openweather-api-key <key>',
    'specify and save OpenWeather API key for future use'
  )
  .option('-l --last', 'reuse last location used', false)
  .option('-k --skip-last-used-sort', "don't sort last used location to top", false)
  .option('-i --imperial', 'use imperial units (.e.g. fahrenheit)', false)
  .action(command);

program.parse();
