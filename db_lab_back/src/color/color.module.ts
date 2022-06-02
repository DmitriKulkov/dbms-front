import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorController } from "./color.controller";
import { Color } from "./color.entity";
import { ColorService } from "./color.service";

@Module({
  controllers: [ColorController],
  providers: [ColorService],
  imports: [TypeOrmModule.forFeature([Color])],
  exports: [ColorService]
})

export class ColorModule {}
