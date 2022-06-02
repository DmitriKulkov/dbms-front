import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from "./product/product.module";
import { Product } from "./product/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaModule } from "./file/file.module";
import { Color } from "./color/color.entity";
import { File } from "./file/file.entity";
import { CartItemModule } from "./cart-items/cart-items.module";
import { CategoryModule } from "./category/category.module";
import { CollectionModule } from "./collection/collection.module";
import { ModelModule } from "./model/model.module";
import { Stock } from "./stock/stock.entity";
import { Discount } from "./discount/discount.entity";
import { Order } from "./order/order.entity";
import { OrderItem } from "./order-item/order-item.entity";
import { CartItem } from "./cart-items/cart-item.entity";
import { User } from "./user/user.entity";
import { Collection } from "./collection/collection.entity";
import { Category } from "./category/category.entity";
import { StockModule } from "./stock/stock.module";
import { ColorModule } from "./color/color.module";
import { DiscountModule } from "./discount/discount.module";
import { UserModule } from "./user/user.module";
import { OrderItemsModule } from "./order-item/order-items.module";
import { Model } from "./model/model.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: "root", //process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        Product,
        Stock,
        Color,
        File,
        Discount,
        Order,
        OrderItem,
        CartItem,
        User,
        Collection,
        Category,
        Model,
      ],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    ProductModule,
    StockModule,
    MediaModule,
    ColorModule,
    DiscountModule,
    UserModule,
    CartItemModule,
    CategoryModule,
    CollectionModule,
    ModelModule,
    OrderItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
