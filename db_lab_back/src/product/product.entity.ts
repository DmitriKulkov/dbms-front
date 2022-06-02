import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Stock } from "src/stock/stock.entity";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";

import { Model } from "src/model/model.entity";
import { Color } from "src/color/color.entity";
import { File } from "../file/file.entity";
import { Discount } from "src/discount/discount.entity";

@Entity({ name: "products" })
export class Product {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "9.99", description: "Product Price" })
  @Column({ type: "money", nullable: false })
  price: number;

  @ManyToOne(() => Model, (model) => model.products)
  @JoinColumn({ name: "model_id" })
  model: Model;

  @ApiProperty({ example: "21/22", description: "discount start date" })
  @Column({ type: "timestamp", nullable: true, name: "starts_at" })
  startsAt: Date;

  @ApiProperty({ example: "4/1/22", description: "discount end date" })
  @Column({ type: "timestamp", nullable: true, name: "ends_at" })
  endsAt: Date;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @OneToMany(() => File, (files) => files.product)
  files: File[];

  @OneToOne(() => Discount, (discount) => discount.product)
  discount: Discount;

  @ManyToOne(() => Color, (color) => color.products)
  @JoinColumn({ name: "color_id" })
  color: Color;
}
