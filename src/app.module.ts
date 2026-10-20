import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChargersModule } from './chargers/chargers.module.js';
import { DbModule } from './db/db.module.js';
import { LocationsModule } from './locations/locations.module.js';

@Module({
  imports: [DbModule, LocationsModule, ChargersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
