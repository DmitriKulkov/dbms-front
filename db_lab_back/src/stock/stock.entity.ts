import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Size } from "src/enums";
import { OneToMany } from "typeorm";
import { Product } from "src/product/product.entity";
import { OrderItem } from "src/order-item/order-item.entity";
import { CartItem } from "src/cart-items/cart-item.entity";

@Entity({ name: "stocks" })
@Unique("stocks_product_id_size__key", ["size", "product"])
export class Stock {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.stocks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ApiProperty({ example: "XS", description: "product size" })
  @Column({
    type: "enum",
    enum: Size,
    enumName: "sizes",
  })
  size: string;

  @ApiProperty({ example: 10, description: "product quantity" })
  @Column({ type: "int" })
  quantity: number;

  @OneToMany(() => OrderItem, (orderItems) => orderItems)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cartItems) => cartItems.stock)
  cartItems: CartItem[];
}
