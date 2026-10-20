import type { Charger, ChargerStatus } from './charger.entity.js';

export type ChargerStats = {
  total: number;
  available: number;
  occupied: number;
  outOfService: number;
  // Share of available chargers, rounded to a whole percent (0 when empty).
  availabilityPct: number;
};

// Pure function: no DB or HTTP, so it can be unit-tested in isolation.
export function computeStats(chargers: Charger[]): ChargerStats {
  const count = (status: ChargerStatus) =>
    chargers.filter((charger) => charger.status === status).length;

  const total = chargers.length;
  const available = count('available');

  return {
    total,
    available,
    occupied: count('occupied'),
    outOfService: count('out_of_service'),
    availabilityPct: total ? Math.round((available / total) * 100) : 0,
  };
}
