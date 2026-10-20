import { IsIn, IsMongoId } from 'class-validator';
import {
  CHARGER_STATUSES,
  type ChargerStatus,
  type NewCharger,
} from '../charger.entity.js';

export class CreateChargerDto implements NewCharger {
  @IsMongoId()
  locationId: string;

  @IsIn(CHARGER_STATUSES)
  status: ChargerStatus;
}
