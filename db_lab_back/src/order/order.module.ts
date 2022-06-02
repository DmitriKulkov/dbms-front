import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { OrderItem } from "../order-item/order-item.entity";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
})
export class OrderModule {}
