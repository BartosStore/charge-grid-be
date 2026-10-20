export const CHARGER_STATUSES = [
  'available',
  'occupied',
  'out_of_service',
] as const;

export type ChargerStatus = (typeof CHARGER_STATUSES)[number];

export class Charger {
  _id: string;
  locationId: string;
  status: ChargerStatus;
}

export type NewCharger = Omit<Charger, '_id'>;
