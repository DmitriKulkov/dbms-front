import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { OrderItem } from "../order-item/order-item.entity";

@Entity({ name: "orders" })
export class Order {
  @ApiProperty({ example: "1", description: "Unique Id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "1", description: "User Id" })
  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "user_id" })
  user: number;

  @ApiProperty({
    example: "Russia, Moscow, Baker St., 4",
    description: "Address",
  })
  @Column({
    type: "varchar",
  })
  address: string;

  @ApiProperty({ example: "110032", description: "Index" })
  @Column({
    type: "int",
    name: "ship_index",
  })
  shipIndex: number;

  @ApiProperty({ example: "Igor", description: "Name" })
  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @ApiProperty({ example: "Ivanov", description: "Surname" })
  @Column({
    type: "varchar",
    length: 50,
  })
  surname: string;

  @ApiProperty({ example: "Pvalovich", description: "Patronymic" })
  @Column({
    type: "varchar",
    length: 50,
  })
  patronymic: string;

  @ApiProperty({ example: "+7-777-111-22-66", description: "Phone number" })
  @Column({
    type: "varchar",
    length: 20,
  })
  phone: string;

  @ApiProperty({ example: "user@mail.com", description: "Email" })
  @Column({
    type: "varchar",
    length: 100,
  })
  email: string;

  @ApiProperty({ example: "7333.33", description: "Total cost" })
  @Column({
    type: "double precision",
    default: 0.0,
  })
  total: number;

  @ApiProperty({ example: "399.99", description: "Shipping cost" })
  @Column({
    type: "double precision",
    default: 0.0,
  })
  shipping: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem;
}
