import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { REGIONS, type Region } from '../location.entity.js';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsIn(REGIONS)
  region: Region;
}
