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
import { Charger } from './charger.entity.js';
import { ChargersService } from './chargers.service.js';
import { CreateChargerDto } from './dto/create-charger.dto.js';
import { UpdateChargerDto } from './dto/update-charger.dto.js';

@Controller('chargers')
export class ChargersController {
  constructor(private readonly chargersService: ChargersService) {}

  @Get()
  findAll(@Query('locationId') locationId?: string): Charger[] {
    return this.chargersService.findAll(locationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Charger {
    return this.chargersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateChargerDto): Charger {
    return this.chargersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChargerDto): Charger {
    return this.chargersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.chargersService.remove(id);
  }
}
