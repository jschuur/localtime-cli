#!/usr/bin/env node

import path from 'path';
import url from 'url';

import { program } from 'commander';
import 'dotenv/config';
import jsonfile from 'jsonfile';

import { MIN_CITY_POPULATION } from './prompt.js';

import command from './command.js';
import { numberFormat } from './util.js';

const packageJson = jsonfile.readFileSync(
  path.join(url.fileURLToPath(new URL('.', import.meta.url)), '../package.json')
);

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
  .option('-w --weather', 'include local weather (via OpenWeather API)', false)
  .action(command);

program.parse();
