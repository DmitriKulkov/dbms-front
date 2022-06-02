import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/product.entity";

@Entity({ name: "files" })
export class File {
  @ApiProperty({ example: "1", description: "unique id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "t-shirt-1", description: "name" })
  @Column({ type: "varchar", length: 30 })
  name: string;

  @ApiProperty({ example: "data:image/jpeg;base64,ZmlsZTovLy9ob21lL3NpbXBsZXBjL1BpY3R1cmVzLzExNTYwOTc3LTIuanBnCg==", description: "BASE64 encoded image"})
  @Column({ type: "text"})
  encoded_img: string;

  @ManyToOne(() => Product, (product) => product.files, {
    primary: true,
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
