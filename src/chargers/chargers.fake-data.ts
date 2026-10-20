import type { Charger } from './charger.entity.js';

export const FAKE_CHARGERS: Charger[] = [
  {
    _id: '6650c1000000000000000001',
    locationId: '6650a1000000000000000001',
    status: 'available',
  },
  {
    _id: '6650c1000000000000000002',
    locationId: '6650a1000000000000000001',
    status: 'occupied',
  },
  {
    _id: '6650c1000000000000000003',
    locationId: '6650a1000000000000000002',
    status: 'available',
  },
  {
    _id: '6650c1000000000000000004',
    locationId: '6650a1000000000000000002',
    status: 'out_of_service',
  },
  {
    _id: '6650c1000000000000000005',
    locationId: '6650a1000000000000000003',
    status: 'occupied',
  },
  {
    _id: '6650c1000000000000000006',
    locationId: '6650a1000000000000000004',
    status: 'available',
  },
  {
    _id: '6650c1000000000000000007',
    locationId: '6650a1000000000000000005',
    status: 'available',
  },
  {
    _id: '6650c1000000000000000008',
    locationId: '6650a1000000000000000005',
    status: 'occupied',
  },
];
