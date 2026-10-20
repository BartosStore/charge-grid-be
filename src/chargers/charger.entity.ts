export const CHARGERS_COLLECTION = 'chargers';

export const CHARGER_STATUSES = [
  'available',
  'occupied',
  'out_of_service',
] as const;

export type ChargerStatus = (typeof CHARGER_STATUSES)[number];

// A type alias (not a class) so it is assignable to the DB's `Document`.
export type Charger = {
  _id: string;
  locationId: string;
  status: ChargerStatus;
};

export type NewCharger = Omit<Charger, '_id'>;
