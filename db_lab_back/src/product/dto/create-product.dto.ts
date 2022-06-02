import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  Length,
  Min,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "1", description: "unique collection id" })
  @IsNumber({}, { message: "should a be number" })
  collectionId: number;

  @ApiProperty({ example: "maro T-shirt", description: "product name" })
  @IsString({ message: "shold be a string" })
  @Length(1, 30, { message: "name length should be between 1 30" })
  name: string;

  @ApiProperty({ example: "maro", description: "unique link" })
  @IsString({ message: "shold be a string" })
  @Length(1, 30, { message: "slug length should be between 1 30" })
  slug: string;

  @ApiProperty({ example: 3000, description: "price" })
  @IsNumber({}, { message: "should a be number" })
  @Min(200)
  price: number;

  @ApiProperty({ example: "maro", description: "description" })
  @IsString({ message: "shold be a string" })
  description: string;

  @ApiProperty({ example: "xzxzxzzzz", description: "sale start date" })
  @IsBoolean()
  released: boolean;

  @ApiProperty({ example: 1000, description: "discount" })
  @IsNumber({}, { message: " discount error" })
  discount: number;

  @ApiProperty({ example: "21/22", description: "discount start date" })
  @IsDate({ message: "date of starting discount error" })
  startsAt: Date;

  @ApiProperty({ example: "4/1/22", description: "discount end date" })
  @IsDate({ message: "date of ending discount error" })
  endsAt: Date;
}
