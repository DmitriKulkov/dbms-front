import { ApiProperty } from "@nestjs/swagger";
import { Model } from "src/model/model.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "category" })
export class Category {
  @ApiProperty({ example: "1", description: "Unique Id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Shoes", description: "Product Category" })
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @OneToMany(() => Model, (models) => models.category)
  models: Model[];
}
  