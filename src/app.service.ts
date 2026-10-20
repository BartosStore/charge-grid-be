import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Charge Grid - network of electric vehicle charging stations';
  }
}
