import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  Check,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/product.entity";

@Entity({ name: "colors" })
@Check("check_hex", "hex ~ '^#[a-f0-9]{2}[a-f0-9]{2}[a-f0-9]{2}$'")
@Unique("colors_name_hex_key", ["name", "hex"])
export class Color {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "WHITE", description: "color name" })
  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: "#ffffff", description: "color hex code" })
  @Column({ type: "varchar", length: 7, unique: true })
  hex: string;

  @OneToMany(() => Product, (products) => products.color)
  products: Product[];
}
