import { Module } from '@nestjs/common';
import { LocationsModule } from '../locations/locations.module.js';
import { ChargersController } from './chargers.controller.js';
import { ChargersService } from './chargers.service.js';

@Module({
  imports: [LocationsModule],
  controllers: [ChargersController],
  providers: [ChargersService],
})
export class ChargersModule {}
