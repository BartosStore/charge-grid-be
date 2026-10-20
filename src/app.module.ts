import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LocationsModule } from './locations/locations.module.js';

@Module({
  imports: [LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
