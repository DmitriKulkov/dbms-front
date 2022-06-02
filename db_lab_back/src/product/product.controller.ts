import {
  Controller,
  Get,
  Put,
  Body,
  Delete,
  Param,
  Post,
  Req,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Request } from "express";

@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get("/")
  getAll(@Query() que) {
    return this.productService.getAll(que);
  }

  @Get("/sellable")
  getAllSellable() {
    return this.productService.getAllReleased();
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.productService.getOne(id);
  }

  @Post()
  create(@Body() dto) {
    return this.productService.create(dto);
  }

  @Put()
  update(@Body() dto) {
    return this.productService.update(dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.productService.delete(id);
  }

  @Get("/collection/:collection")
  getProductsByCollection(@Param("collection") collection: string, @Query() que){
    console.log("Yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + " limit=" + que._limit + " page=" + que._page + " collection=" + collection)
    return this.productService.getByCollection(collection, que)
  }
}
