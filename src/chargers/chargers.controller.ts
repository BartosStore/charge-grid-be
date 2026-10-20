import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { ChargerStats } from './charger-stats.js';
import type { Charger } from './charger.entity.js';
import { ChargersService } from './chargers.service.js';
import { CreateChargerDto } from './dto/create-charger.dto.js';
import { UpdateChargerDto } from './dto/update-charger.dto.js';

@Controller('chargers')
export class ChargersController {
  constructor(private readonly chargersService: ChargersService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string): Promise<Charger[]> {
    return this.chargersService.findAll(locationId);
  }

  // Must stay above @Get(':id'), otherwise "stats" would be matched as an id.
  @Get('stats')
  getStats(@Query('locationId') locationId?: string): Promise<ChargerStats> {
    return this.chargersService.getStats(locationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Charger> {
    return this.chargersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateChargerDto): Promise<Charger> {
    return this.chargersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateChargerDto,
  ): Promise<Charger> {
    return this.chargersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.chargersService.remove(id);
  }
}
