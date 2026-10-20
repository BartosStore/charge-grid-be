import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../common/generate-id.js';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Location } from './location.entity.js';
import { FAKE_LOCATIONS } from './locations.fake-data.js';

@Injectable()
export class LocationsService {
  // In-memory store seeded with fake data; replaced by a database later.
  private readonly locations: Location[] = structuredClone(FAKE_LOCATIONS);

  findAll(): Location[] {
    return this.locations;
  }

  findOne(id: string): Location {
    const location = this.locations.find((l) => l._id === id);
    if (!location) {
      throw new NotFoundException(`Location ${id} not found`);
    }
    return location;
  }

  create(dto: CreateLocationDto): Location {
    const location: Location = { _id: generateId(), ...dto };
    this.locations.push(location);
    return location;
  }

  update(id: string, dto: UpdateLocationDto): Location {
    const location = this.findOne(id);
    Object.assign(location, dto);
    return location;
  }

  remove(id: string): void {
    const location = this.findOne(id);
    this.locations.splice(this.locations.indexOf(location), 1);
  }
}
