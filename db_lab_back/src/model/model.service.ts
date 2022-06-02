import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionService } from 'src/collection/collection.service';
import { Repository } from 'typeorm';
import { Model } from './model.entity';

@Injectable()
export class ModelService {
    constructor(
        @InjectRepository(Model) private modelRepository: Repository<Model>,
        private collectionService: CollectionService
    ){}
    async getByCollection(slug:string){
        const collection = this.collectionService.getBySlug(slug)
        const p = await this.modelRepository.find({
            where: {collection}
        })
        return p
    }
}
