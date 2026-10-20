import { computeStats } from './charger-stats.js';
import type { Charger, ChargerStatus } from './charger.entity.js';

const charger = (status: ChargerStatus): Charger => ({
  _id: 'c',
  locationId: 'l',
  status,
});

describe('computeStats', () => {
  it('counts chargers by status', () => {
    const stats = computeStats([
      charger('available'),
      charger('available'),
      charger('occupied'),
      charger('out_of_service'),
    ]);

    expect(stats).toEqual({
      total: 4,
      available: 2,
      occupied: 1,
      outOfService: 1,
      availabilityPct: 50,
    });
  });

  it('rounds availability to a whole percent', () => {
    const stats = computeStats([
      charger('available'),
      charger('occupied'),
      charger('occupied'),
    ]);

    expect(stats.availabilityPct).toBe(33);
  });

  it('returns zeros for no chargers', () => {
    expect(computeStats([])).toEqual({
      total: 0,
      available: 0,
      occupied: 0,
      outOfService: 0,
      availabilityPct: 0,
    });
  });
});
