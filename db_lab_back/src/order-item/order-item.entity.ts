import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/order/order.entity";
import { Stock } from "src/stock/stock.entity";

@Entity({ name: "order_items" })
export class OrderItem {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "3", description: "Quantity of Items" })
  @Column({ type: "int", nullable: false })
  quantity: number;

  @ApiProperty({ example: "30", description: "Discount" })
  @Column({ type: "int", nullable: false })
  discount: number;

  @ManyToOne(() => Stock, (stock) => stock.orderItems)
  @JoinColumn({ name: "stock_id" })
  stock: Stock;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order: Order;
}
