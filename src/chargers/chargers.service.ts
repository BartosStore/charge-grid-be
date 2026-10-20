import { Collection, Database } from '@apify/hiring-document-database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../common/generate-id.js';
import { LocationsService } from '../locations/locations.service.js';
import { computeStats, type ChargerStats } from './charger-stats.js';
import { CHARGERS_COLLECTION, type Charger } from './charger.entity.js';
import { CreateChargerDto } from './dto/create-charger.dto.js';
import { UpdateChargerDto } from './dto/update-charger.dto.js';

@Injectable()
export class ChargersService {
  private readonly chargers: Collection;

  constructor(
    db: Database,
    private readonly locationsService: LocationsService,
  ) {
    this.chargers = db.collection(CHARGERS_COLLECTION);
  }

  async findAll(locationId?: string): Promise<Charger[]> {
    const filter = locationId ? { locationId } : {};
    return (await this.chargers.list(filter).toArray()) as Charger[];
  }

  async getStats(locationId?: string): Promise<ChargerStats> {
    if (locationId) {
      // Throws 404 so the dashboard never shows a card for a missing location.
      await this.locationsService.findOne(locationId);
    }
    return computeStats(await this.findAll(locationId));
  }

  async findOne(id: string): Promise<Charger> {
    const charger = await this.chargers.get(id);
    if (!charger) {
      throw new NotFoundException(`Charger ${id} not found`);
    }
    return charger as Charger;
  }

  async create(dto: CreateChargerDto): Promise<Charger> {
    // Throws 404 when the location does not exist.
    await this.locationsService.findOne(dto.locationId);
    return (await this.chargers.insert({
      _id: generateId(),
      ...dto,
    })) as Charger;
  }

  async update(id: string, dto: UpdateChargerDto): Promise<Charger> {
    if (dto.locationId) {
      await this.locationsService.findOne(dto.locationId);
    }
    const { numMatched } = await this.chargers.update({ _id: id }, { ...dto });
    if (numMatched === 0) {
      throw new NotFoundException(`Charger ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    if (!(await this.chargers.delete(id))) {
      throw new NotFoundException(`Charger ${id} not found`);
    }
  }
}
