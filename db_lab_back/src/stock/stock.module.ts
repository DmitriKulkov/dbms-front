import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { Stock } from "./stock.entity";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [TypeOrmModule.forFeature([Stock, Product])],
})
export class StockModule {}
