import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/enums";
import { Order } from "src/order/order.entity";
import { CartItem } from "src/cart-items/cart-item.entity";

@Entity({ name: "users" })
export class User {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "user@mail.ru", description: "Email" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @Column({ type: "varchar", nullable: true })
  password: string;

  @ApiProperty({ example: "user", description: "User role" })
  @Column({
    type: "enum",
    enum: UserRole,
    enumName: "roles",
    default: UserRole.USER,
  })
  role: string;

  @ApiProperty({
    example: "01.01.2022",
    description: "Last session date",
  })
  @Column({ type: "timestamp", nullable: true, name: "last_login" })
  lastLogin: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => CartItem, (cartItems) => cartItems.user)
  cartItems: CartItem[];
}
