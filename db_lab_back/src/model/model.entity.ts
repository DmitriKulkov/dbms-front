import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Collection } from "src/collection/collection.entity";
import { Product } from "src/product/product.entity";
import { Category } from "src/category/category.entity";

@Entity({ name: "models" })
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "T-shirt Mk. 1", description: "Product model" })
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @ApiProperty({ example: "t-shirt-mk-1", description: "Product slug" })
  @Column({ type: "varchar", length: 100, nullable: false })
  slug: string;

  @ApiProperty({
    example: "name: T-shirt Mk. 1, material: Leather",
    description: "Model description",
  })
  @Column({ type: "text", nullable: false })
  description: string;

  @ApiProperty({ example: "true", description: "Was Model released or not" })
  @Column({ type: "boolean", nullable: false })
  released: boolean;

  @OneToMany(() => Product, (products) => products.model)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.models)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Collection, (collection) => collection.models)
  @JoinColumn({ name: "collection_id" })
  collection: Collection;
}
