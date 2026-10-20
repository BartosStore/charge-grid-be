import { Collection, Database } from '@apify/hiring-document-database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../common/generate-id.js';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { LOCATIONS_COLLECTION, type Location } from './location.entity.js';

@Injectable()
export class LocationsService {
  private readonly locations: Collection;

  constructor(db: Database) {
    this.locations = db.collection(LOCATIONS_COLLECTION);
  }

  async findAll(): Promise<Location[]> {
    return (await this.locations.list().toArray()) as Location[];
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locations.get(id);
    if (!location) {
      throw new NotFoundException(`Location ${id} not found`);
    }
    return location as Location;
  }

  async create(dto: CreateLocationDto): Promise<Location> {
    return (await this.locations.insert({
      _id: generateId(),
      ...dto,
    })) as Location;
  }

  async update(id: string, dto: UpdateLocationDto): Promise<Location> {
    const { numMatched } = await this.locations.update({ _id: id }, { ...dto });
    if (numMatched === 0) {
      throw new NotFoundException(`Location ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    if (!(await this.locations.delete(id))) {
      throw new NotFoundException(`Location ${id} not found`);
    }
  }
}
