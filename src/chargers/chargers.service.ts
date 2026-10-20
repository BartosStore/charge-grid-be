import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../common/generate-id.js';
import { LocationsService } from '../locations/locations.service.js';
import type { Charger } from './charger.entity.js';
import { FAKE_CHARGERS } from './chargers.fake-data.js';
import { CreateChargerDto } from './dto/create-charger.dto.js';
import { UpdateChargerDto } from './dto/update-charger.dto.js';

@Injectable()
export class ChargersService {
  // In-memory store seeded with fake data; replaced by a database later.
  private readonly chargers: Charger[] = structuredClone(FAKE_CHARGERS);

  constructor(private readonly locationsService: LocationsService) {}

  findAll(locationId?: string): Charger[] {
    return locationId
      ? this.chargers.filter((charger) => charger.locationId === locationId)
      : this.chargers;
  }

  findOne(id: string): Charger {
    const charger = this.chargers.find((charger) => charger._id === id);
    if (!charger) {
      throw new NotFoundException(`Charger ${id} not found`);
    }
    return charger;
  }

  create(dto: CreateChargerDto): Charger {
    // Throws 404 when the location does not exist.
    this.locationsService.findOne(dto.locationId);
    const newCharger: Charger = { _id: generateId(), ...dto };
    this.chargers.push(newCharger);
    return newCharger;
  }

  update(id: string, dto: UpdateChargerDto): Charger {
    const charger = this.findOne(id);
    if (dto.locationId) {
      this.locationsService.findOne(dto.locationId);
    }
    Object.assign(charger, dto);
    return charger;
  }

  remove(id: string): void {
    const charger = this.findOne(id);
    this.chargers.splice(this.chargers.indexOf(charger), 1);
  }
}
