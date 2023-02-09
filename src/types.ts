export interface DefaultCmdOptions {
  timezone?: boolean;
  country?: boolean;
  city?: boolean;
  cityAll?: boolean;
  weather?: boolean;
  all?: boolean;
  allMin?: boolean;
  openweatherApiKey?: string;
  saveOpenweatherApiKey?: string;
  last?: boolean;
  skipLastUsedSort?: boolean;
}

export interface TimeZoneLocation {
  name: string;
  timezone: string;
  type: 'timezone' | 'country' | 'city';
  lastUsed?: boolean;
}

export interface AutoCompleteEntry {
  name: string;
  value: TimeZoneLocation;
}
