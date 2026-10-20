export const LOCATIONS_COLLECTION = 'locations';

export const REGIONS = [
  'Hlavní město Praha',
  'Středočeský kraj',
  'Jihočeský kraj',
  'Plzeňský kraj',
  'Karlovarský kraj',
  'Ústecký kraj',
  'Liberecký kraj',
  'Královéhradecký kraj',
  'Pardubický kraj',
  'Kraj Vysočina',
  'Jihomoravský kraj',
  'Olomoucký kraj',
  'Zlínský kraj',
  'Moravskoslezský kraj',
] as const;

export type Region = (typeof REGIONS)[number];

// A type alias (not an interface) so it is assignable to the DB's `Document`.
export type Location = {
  _id: string;
  name: string;
  city: string;
  region: Region;
};
