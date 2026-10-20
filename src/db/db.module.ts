import { Database } from '@apify/hiring-document-database';
import { Global, Module } from '@nestjs/common';
import { CHARGERS_COLLECTION } from '../chargers/charger.entity.js';
import { FAKE_CHARGERS } from '../chargers/chargers.fake-data.js';
import { LOCATIONS_COLLECTION } from '../locations/location.entity.js';
import { FAKE_LOCATIONS } from '../locations/locations.fake-data.js';

// A single in-memory Database instance shared by the whole app.
// `Database` is a class, so services inject it by type without @Inject().
@Global()
@Module({
  providers: [
    {
      provide: Database,
      useFactory: () =>
        new Database({
          [LOCATIONS_COLLECTION]: FAKE_LOCATIONS,
          [CHARGERS_COLLECTION]: FAKE_CHARGERS,
        }),
    },
  ],
  exports: [Database],
})
export class DbModule {}
