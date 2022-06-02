import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaController } from "./file.controller";
import { File } from "./file.entity";
import { MediaService } from "./file.service";

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([File])],
})
export class MediaModule {}
