import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @MessagePattern('process_order')
  processOrder(@Payload() payload: string) {
    return this.ordersService.processOrder(JSON.parse(payload));
  }
}
