import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModule } from 'src/collection/collection.module';
import { CollectionService } from 'src/collection/collection.service';
import { ModelController } from './model.controller';
import { Model } from './model.entity';
import { ModelService } from './model.service';

@Module({
  controllers: [ModelController],
  providers: [ModelService],
  imports: [
    TypeOrmModule.forFeature([Model]), 
    forwardRef(()=>CollectionModule)],
    exports: [ModelService]
})
export class ModelModule {}
